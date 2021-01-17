const fs = require("fs")
const path = require("path")

const fetch = require('isomorphic-fetch')
const { default: Queue } = require('p-queue')
const ProgressBar = require('progress')

async function fetchFilings() {
  const url = 'https://ethics.lacity.org/CFCs/Search/SearchService.cfc?method=dtHandler&dtQuery=FilingSearch'
  const headers = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'cookie': 'PTSEARCHCOOKIE=search_type_shortname=CmpExpenditure&search_type_id=2&inc_unitemized=yes&inc_itemized=yes&document_id=80950&inc_schedule=E%2CG%2CD'
  }
  const body = 'search_type_id=3&datetype=datefiled&document_source_number=CA460&document_type_id=1%2C19%2C39'
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body
  })
  const json = await response.json()
  return json.data
}

async function fetchContributions(docId) {
  const url = `https://ethics.lacity.org/CFCs/Search/SearchService.cfc?method=dtHandler&dtQuery=cmpContributionSearch`
  const headers = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'cookie': `PTSEARCHCOOKIE=search_type_shortname=CmpContribution&search_type_id=1&inc_unitemized=yes&inc_itemized=yes&inc_schedule=A1%CB1%2CI&document_id=${docId}`
  }
  const body = `search_type_shortname=CmpContribution&search_type_id=1&inc_itemized=yes&inc_schedule=A%2CB%2CC%2CI&document_id=${docId}&inc_unitemized=yes`
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body
  })
  const json = await response.json()
  const { data } = json
  return data
}

async function fetchExpenditures(docId) {
  const url = `https://ethics.lacity.org/CFCs/Search/SearchService.cfc?method=dtHandler&dtQuery=cmpExpenditureSearch`
  const headers = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'cookie': `PTSEARCHCOOKIE=search_type_shortname=CmpExpenditure&search_type_id=2&inc_unitemized=yes&inc_itemized=yes&document_id=${docId}&inc_schedule=E%2CG%2CD`
  }
  const body = `search_type_shortname=CmpExpenditure&search_type_id=2&inc_itemized=yes&document_id=${docId}&inc_schedule=E%2CG%2CD&inc_unitemized=yes`
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body
  })
  const json = await response.json()
  const { data } = json
  return data
}

async function downloadLaCity() {
  const filings = await fetchFilings()
  const bar = new ProgressBar(':bar :percent (:current / :total filings) ', {
    complete: '=',
    incomplete: ' ',
    total: filings.length,
  });
  const queue = new Queue({ concurrency: 8 })
  let isFirst = true

  const writeStream = fs.createWriteStream(path.join(__dirname, '../../tmp/la-city.json'))

  writeStream.write('[\n')

  async function getFilingData(filing, i) {
    const { document_id: docId } = filing
    try {
      const contributions = await fetchContributions(docId)
      const expenditures = await fetchExpenditures(docId)
      const str = `${JSON.stringify({
        ...filing,
        contributions,
        expenditures,
      })}`

      writeStream.write(`${isFirst ? '' : ','}${str}\n`)
      isFirst = false
      bar.tick()
    } catch (e) {
      console.error(`Error with ${docId}, adding back to the queue`)
      bar.tick(-1)
      queue.add(() => getFilingData(filing, i))
    }
  }

  filings.forEach((filing, i) => {
    // TODO: Only queue up scrapes for reports we haven't yet processed
    // Which means we have to figure out a way to take note of what we have and have not processed
    queue.add(() => getFilingData(filing, i))
  })
  
  await queue.onIdle()

  writeStream.write(']')
}

module.exports = downloadLaCity
