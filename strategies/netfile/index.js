const exec = require("../exec.js")

const download = require("./download.js")
const extract = require("./extract.js")
const load = require("./load.js")

// const args = process.argv.slice(2)
// const [aid, year = "2020"] = args

async function main({ agencyName, agencyId, year }) {
  const opts = { agencyName, agencyId, year }

  const f = `${agencyName} (${agencyId} - ${year})`

  console.log(`Ok, running for ${f}`)
  await exec(`mkdir -p tmp`)

  // console.log(`Skipping all downloads for now`)
  console.log(`Downloading ${f}...`)
  await download(opts)
  console.log(`Downloaded ${f}`)

  console.log(`Extracting ${f}...`)
  try {
    await extract(opts)
    console.log(`Extracted ${f}`)
  } catch (e) {
    if (e.code === 9) {
      console.log(`Problem extracting ${f}, skipping it`)
    } else {
      console.error(`Error with extaction`, e.code)
    }
    return
  }

  console.log(`Saving ${f} to database...`)
  await load(opts)
  console.log(`Saved ${f} to database`)

  console.log(`Done with ${f}`)
  return
}

module.exports = main
