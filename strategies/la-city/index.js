const exec = require("../exec.js")

const download = require("./download.js")
const load = require("./load.js")

async function main() {
  const f = `Los Angeles (LAX)`

  console.log(`Ok, running for ${f}`)
  await exec(`mkdir -p tmp`)

  console.log(`Skipping all downloads for now`)
  console.log(`Downloading ${f}...`)
  await download()
  console.log(`Downloaded ${f}`)

  console.log(`Saving ${f} to database...`)
  await load()
  console.log(`Saved ${f} to database`)

  console.log(`Done with ${f}`)
  return
}

module.exports = main
