const fs = require("fs").promises

const { default: Queue } = require("p-queue")

const datasette = require("./datasette.json")
const netfile = require("./strategies/netfile")

const queue = new Queue({ concurrency: 2 })
const config = require("./config.js")
const { sitesToScrape } = config

const startTime = new Date()
console.log(`Starting at ${startTime}`)

const year = "2020"
sitesToScrape.forEach((site) => {
  const { entity: agencyName, vendor, vendorId: agencyId } = site

  // if (agencyId !== "SAC") return

  if (vendor === "netfile") {
    queue.add(async () => {
      await netfile({ agencyName, agencyId, year })
      return
    })
  }
})

queue.onIdle().then(async () => {
  const endTime = new Date()
  const durationMs = endTime - startTime
  const durationSec = durationMs / 1000
  const durationMin = durationSec / 60

  console.log(
    `Finished at ${endTime}, took about ${Math.ceil(durationMin)} minute${
      Math.ceil(durationMin) !== 1 ? "s" : ""
    }`
  )

  const formattedEndDate = `${endTime.getFullYear()}-${
    endTime.getMonth() + 1
  }-${endTime.getDate()}`

  datasette.description = datasette.description.replace(
    /\d{4}-\d{1,2}-\d{1,2}\.$/,
    `${formattedEndDate}.`
  )

  await fs.writeFile("./datasette.json", JSON.stringify(datasette, null, 2))

  process.exit(0)
})
