const excelToJson = require("convert-excel-to-json")
const { timeFormat }  = require('d3-time-format')
const { default: Queue } = require("p-queue")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const queue = new Queue({ concurrency: 2 })

const entityTypeMapping = {
  COM: "committee",
  RCP: "recipient-committee",
  IND: "individual",
  OTH: "other",
  PTY: "political-party",
  SCC: "small-contributor-committee",
}

const formatDate = timeFormat('%Y-%m-%d')

function getTransactionId({
  agencyStringId,
  fppcId,
  reportNumber,
  reportDate,
  transactionId,
}) {
  const id = [
    agencyStringId,
    fppcId,
    reportNumber,
    reportDate.getTime(),
    transactionId,
  ].join("-")
  return id
}

async function findOrCreateAgency({ name, stringId }) {
  let existing = null

  try {
    existing = await prisma.municipalAgency.findFirst({
      where: { stringId },
    })
  } catch (e) {
    debugger
  }

  if (existing) return existing

  const newlyCreated = await prisma.municipalAgency.create({
    data: {
      name,
      stringId,
    },
  })

  return newlyCreated
}

async function findOrCreateFiler(filer) {
  const { id, name, committeeType } = filer

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

async function createOrIgnoreScheduleA(contribution, agency) {
  const {
    A: fppcId,
    B: filerName,
    C: reportNumber,
    D: committeeType,
    E: reportDate,
    F: reportFromDate,
    G: reportThruDate,
    M: transactionId,
    N: contributorType,
    AB: date,
    AD: amount,
    AF: description,
    AG: contributorCommitteeId,
    O: contributorLastName,
    P: contributorFirstName,
    // Q: contributorPrefix,
    // R: contributorSuffix,
    S: contributorAddress1,
    T: contributorAddress2,
    U: contributorCity,
    V: contributorState,
    W: contributorZip,
    Y: contributorOccupation,
    X: contributorEmployer,
    Z: contributorSelfEmployed,
  } = contribution

  const contributionId = getTransactionId({
    agencyStringId: agency.stringId,
    fppcId,
    reportNumber,
    reportDate,
    transactionId,
  })

  const filer = await findOrCreateFiler({
    committeeType,
    id: fppcId,
    name: filerName,
  })
  const matchingAgency =
    filer.agencies &&
    filer.agencies.find((a) => {
      return a.stringId === agency.id
    })
  if (!matchingAgency) {
    await connectFilerToAgency(filer, agency)
  }


  try {
    await prisma.scheduleAContribution.create({
      data: {
        id: contributionId,
        transactionId,
        date: formatDate(date),
        amount,
        description,
        contributorType: entityTypeMapping[contributorType],
        contributorCommitteeId,
        contributorLastName,
        contributorFirstName,
        contributorAddress1,
        contributorAddress2,
        contributorCity,
        contributorState,
        contributorZip: contributorZip.replace(/-$/, ""),
        contributorOccupation,
        contributorEmployer,
        contributorSelfEmployed: contributorSelfEmployed === "y",
        reportNumber: +reportNumber,
        reportDate: formatDate(reportDate),
        reportFromDate: formatDate(reportFromDate),
        reportThruDate: formatDate(reportThruDate),
        filer: {
          connect: { id: filer.id },
        },
        agency: {
          connect: { id: agency.id },
        },
      },
    })
  } catch (e) {
    if (e.code === "P2002") {
      // uniqueness constraint failed, transaction already added
      return
    }

    console.error(e)
    debugger
  }

  console.log(`Saved contribution ${contributionId}`)
}

async function createOrIgnoreScheduleC(contribution, agency) {
  const {
    A: fppcId,
    B: filerName,
    C: reportNumber,
    D: committeeType,
    E: reportDate,
    F: reportFromDate,
    G: reportThruDate,
    M: transactionId,
    N: contributorType,
    AB: date,
    AD: amount,
    AF: description,
    AG: contributorCommitteeId,
    O: contributorLastName,
    P: contributorFirstName,
    // Q: contributorPrefix,
    // R: contributorSuffix,
    S: contributorAddress1,
    T: contributorAddress2,
    U: contributorCity,
    V: contributorState,
    W: contributorZip,
    Y: contributorOccupation,
    X: contributorEmployer,
    Z: contributorSelfEmployed,
  } = contribution

  const contributionId = getTransactionId({
    agencyStringId: agency.stringId,
    fppcId,
    reportNumber,
    reportDate,
    transactionId,
  })

  const filer = await findOrCreateFiler({
    committeeType,
    id: fppcId,
    name: filerName,
  })
  const matchingAgency =
    filer.agencies &&
    filer.agencies.find((a) => {
      return a.stringId === agency.id
    })
  if (!matchingAgency) {
    await connectFilerToAgency(filer, agency)
  }

  try {
    await prisma.scheduleCContribution.create({
      data: {
        id: contributionId,
        transactionId,
        date: formatDate(date),
        amount,
        description,
        contributorType: entityTypeMapping[contributorType],
        contributorLastName,
        contributorFirstName,
        contributorAddress1,
        contributorAddress2,
        contributorCity,
        contributorState,
        contributorZip: contributorZip.replace(/-$/, ""),
        contributorOccupation,
        contributorEmployer,
        contributorSelfEmployed: contributorSelfEmployed === "y",
        contributorCommitteeId,
        reportNumber: +reportNumber,
        reportDate: formatDate(reportDate),
        reportFromDate: formatDate(reportFromDate),
        reportThruDate: formatDate(reportThruDate),
        filer: {
          connect: { id: filer.id },
        },
        agency: {
          connect: { id: agency.id },
        },
      },
    })
  } catch (e) {
    if (e.code === "P2002") {
      // uniqueness constraint failed, transaction already added
      return
    }

    console.error(e)
    debugger
  }

  console.log(`Saved contribution ${contributionId}`)
}

async function createOrIgnoreScheduleE(payment, agency) {
  const {
    A: fppcId,
    B: filerName,
    C: reportNumber,
    D: committeeType,
    E: reportDate,
    F: reportFromDate,
    G: reportThruDate,
    M: transactionId,
    N: payeeType,
    X: date,
    Y: amount,
    O: payeeLastName,
    P: payeeFirstName,
    S: payeeAddress1,
    T: payeeAddress2,
    U: payeeCity,
    V: payeeState,
    W: payeeZip,
    AB: code,
    AC: description,
    AH: payeeCommitteeId,
  } = payment

  const paymentId = getTransactionId({
    agencyStringId: agency.stringId,
    fppcId,
    reportNumber,
    reportDate,
    transactionId,
  })

  const filer = await findOrCreateFiler({
    committeeType,
    id: fppcId,
    name: filerName,
  })
  const matchingAgency =
    filer.agencies &&
    filer.agencies.find((a) => {
      return a.stringId === agency.id
    })
  if (!matchingAgency) {
    await connectFilerToAgency(filer, agency)
  }

  try {
    await prisma.scheduleEPayment.create({
      data: {
        id: paymentId,
        transactionId,
        date: formatDate(date),
        amount,
        description,
        code,
        payeeType: entityTypeMapping[payeeType],
        payeeLastName,
        payeeFirstName,
        payeeAddress1,
        payeeAddress2,
        payeeCity,
        payeeState,
        payeeZip: payeeZip.replace(/-$/, ""),
        payeeCommitteeId,
        reportNumber: +reportNumber,
        reportDate: formatDate(reportDate),
        reportFromDate: formatDate(reportFromDate),
        reportThruDate: formatDate(reportThruDate),
        filer: {
          connect: { id: filer.id },
        },
        agency: {
          connect: { id: agency.id },
        },
      },
    })
  } catch (e) {
    if (e.code === "P2002") {
      // uniqueness constraint failed, transaction already added
      return
    }

    console.error(e)
    debugger
  }

  console.log(`Saved payment ${paymentId}`)
}

async function loadNetfile({ agencyName, agencyId, year }) {
  const excelFile = `./tmp/efile_${agencyId}_${year}.xlsx`

  const data = excelToJson({
    sourceFile: excelFile,
    header: {
      rows: 1,
    },
    sheets: ["A-Contributions", "C-Contributions", "E-Expenditure"],
  })

  const agency = await findOrCreateAgency({
    name: agencyName,
    stringId: agencyId,
  })

  data["A-Contributions"].forEach((contribution) => {
    queue.add(async () => {
      await createOrIgnoreScheduleA(contribution, agency)
    })
  })

  data["C-Contributions"].forEach((contribution) => {
    queue.add(async () => {
      await createOrIgnoreScheduleC(contribution, agency)
    })
  })

  data["E-Expenditure"].forEach((payment) => {
    queue.add(async () => {
      await createOrIgnoreScheduleE(payment, agency)
    })
  })

  return queue.onIdle()
}

module.exports = loadNetfile
