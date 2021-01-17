const fs = require('fs')
const path = require('path')
const readline = require('readline')


const { timeFormat, timeParse } = require('d3-time-format')
const { PrismaClient } = require("@prisma/client")
const { default: Queue } = require('p-queue')

const prisma = new PrismaClient()
const formatDate = timeFormat('%Y-%m-%d')

async function findOrCreateLACityAgency() {
  let existing = null

  try {
    existing = await prisma.municipalAgency.findFirst({
      where: { stringId: 'LAX' },
    })
  } catch (e) {
    debugger
  }

  if (existing) return existing

  const newlyCreated = await prisma.municipalAgency.create({
    data: {
      name: `Los Angeles`,
      stringId: `LAX`,
    },
  })

  return newlyCreated
}

async function findOrCreateFiler({ id, name, committeeType }) {
  let existing = null

  try {
    existing = await prisma.filer.findFirst({
      where: { id },
      include: {
        agencies: true,
      },
    })
  } catch (e) {
    debugger
  }

  if (existing) return existing

  const newlyCreated = await prisma.filer.create({
    data: {
      committeeType,
      id,
      name,
    },
  })

  return newlyCreated
}

async function connectFilerToAgency(filer, agency) {
  await prisma.filer.update({
    where: {
      id: filer.id,
    },
    data: {
      agencies: {
        connect: [{ id: agency.id }],
      },
    },
  })
}

const entityTypeMapping = {
  'Individual': 'individual',
  'Committee': 'committee',
  'Other: Non-Individual': 'other',
  'Small Contributor Committee': 'small-contributor-committee',
}

async function createOrIgnoreScheduleAContribution({
    id,
    transactionId,
    date,
    amount,
    description,
    contributorType,
    contributorCommitteeId,
    contributorLastName,
    contributorFirstName,
    contributorAddress1,
    contributorAddress2,
    contributorCity,
    contributorState,
    contributorZip,
    contributorOccupation,
    contributorEmployer,
    reportNumber,
    reportDate,
    reportFromDate,
    reportThruDate
  },
  filerId,
  agencyId,
) {
  try {
    const saved = await prisma.scheduleAContribution.create({
      data: {
        id,
        transactionId,
        date,
        amount,
        description,
        contributorType,
        contributorCommitteeId,
        contributorLastName,
        contributorFirstName,
        contributorAddress1,
        contributorAddress2,
        contributorCity,
        contributorState,
        contributorZip: contributorZip,
        contributorOccupation,
        contributorEmployer,
        contributorSelfEmployed: null, // i don't think LA data has this field
        reportNumber,
        reportDate,
        reportFromDate,
        reportThruDate,
        filer: {
          connect: { id: filerId },
        },
        agency: {
          connect: { id: agencyId },
        },
      },
    })
    return saved
  } catch (e) {
    if (e.code === "P2002") {
      // uniqueness constraint failed, transaction already added
      return
    }

    console.error(e)
    throw (e)
  }
}

async function loadLaCity() {
  const agency = await findOrCreateLACityAgency()

  async function processLine(line) {
    const {
      date_filed_oneline,
      filer_org_id: fppcId,
      filer_org_name: filerName,
      document_id: reportNumber,
    } = line
    const reportDate = timeParse('%m/%d/%Y')(date_filed_oneline.split(' ')[0])

    const filer = await findOrCreateFiler({ id: fppcId, name: filerName, committeeType: "" })
    const matchingAgency =
      filer.agencies &&
      filer.agencies.find((a) => a.stringId === agency.id)
    if (!matchingAgency) {
      await connectFilerToAgency(filer, agency)
    }

    line.contributions.forEach(c => {
      const {
        con_lname: contributorLastName,
        con_fname: contributorFirstName,
        con_address: contributorAddress1,
        con_addr_city_nm: contributorCity,
        con_addr_state_nm: contributorState,
        con_addr_zip: contributorZip,
        empr: contributorEmployer,
        ent_desc: contributorType,
        memo: description,
        occp: contributorOccupation,
        type: contributionType,
        con_cmt_id: contributorCommitteeId,
      } = c

      const amount = +c.con_amount.replace('$', '').replace(',', '')
      const date = timeParse('%m/%d/%Y')(c.con_date)
      const reportFromDate = timeParse('%Y-%m-%d')(c.per_beg_date)
      const reportThruDate = timeParse('%Y-%m-%d')(c.per_end_date)

      const id = `${agency.id}-${filer.id}-${c.con_name}-${c.con_date}`

      const contribution = {
        id,

        fppcId,
        reportNumber,
        reportDate: formatDate(reportDate),
        reportFromDate: formatDate(reportFromDate),
        reportThruDate: formatDate(reportThruDate),

        contributorType: entityTypeMapping[contributorType] || '',
        date: formatDate(date),
        amount,
        description,

        contributorCommitteeId,
        contributorLastName,
        contributorFirstName,
        contributorAddress1,
        contributorCity,
        contributorState,
        contributorZip,
        contributorEmployer,
        contributorOccupation,

        contributionType
      }

      if (contributionType.includes('Schedule A')) {
        queue.add(() => createOrIgnoreScheduleAContribution(contribution, fppcId, agency.id))
      } else {
        console.log({ c })
      }
      
    })
  }

  const inputPath = path.join(__dirname, '../../tmp/la-city.json')
  const queue = new Queue({ concurrency: 1 })
  const rl = readline.createInterface({
    input: fs.createReadStream(inputPath),
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    if (line.length === 1) {
      continue
    }

    const json = JSON.parse(line.replace(/^,/, ''))
    queue.add(() => processLine(json))
  }

  await queue.onIdle()
}

module.exports = loadLaCity