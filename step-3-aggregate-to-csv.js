const fs = require('fs')

const { csvFormat } = require('d3-dsv')
const glob = require('glob')
const { default: Queue } = require('p-queue')

const db = {}

glob('data/*.json', (err, files) => {
  if (err) {
    console.error(`Error finding all JSON files`, err)
    return
  }

  async function readFile(filePath) {
    const file = await fs.promises.readFile(filePath)
    const json = JSON.parse(file.toString())
    const match = filePath.match(/efile_(\w+)_(\d+)/)
    const entries = Object.entries(json)
    const entityId = match[1]
    const year = match[2]

    entries.forEach(entry => {
      const [key, values] = entry

      if (!db[key]) {
        db[key] = []
      }

      values.forEach(row => {
        row.entity = entityId
        row.year = year
        db[key].push(row)
      })
    })
  }

  console.log(`Combining the files based on type`)

  const queue = new Queue({ concurrency: 1 })
  files.forEach(filePath => {
    queue.add(() => readFile(filePath))
  })

  queue.onIdle().then(() => {
    const entries = Object.entries(db)

    entries.forEach(entry => {
      const [key, values] = entry
      const csv = csvFormat(values)
      const filename = `data/${key.toLowerCase()}.csv`

      fs.writeFileSync(filename, csv)
    })

    console.log(`All done!`)
  })
});