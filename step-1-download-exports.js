const fs = require('fs')
const path = require('path')

const puppeteer =  require('puppeteer')
const { default: Queue } = require('p-queue')

const config = require('./config')

const downloadPath = path.join(process.cwd(), 'data')
const queue = new Queue({ concurrency: 2 })
const yearsEnv = process.env.YEARS
const years = yearsEnv !== "" ? yearsEnv.split(",") : ["2020"]

console.log(`Downloading exports for ${years.join(', ')}`)

async function downloadExport({ aid, year }) {
  const goToUrl = async (u) => {
    await page.goto(u)
    return page
  }
  const downloadPageUrl = `https://public.netfile.com/pub2/Default.aspx?aid=${aid}`
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await goToUrl(downloadPageUrl)
  await page.goto(downloadPageUrl)

  if (page.url() !== downloadPageUrl) {
    await page.goto(downloadPageUrl)
  }

  await page._client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath,
  })

  await page.waitForSelector("#ctl00_phBody_DateSelect")
  await page.select("#ctl00_phBody_DateSelect", year)
  await page.click("#ctl00_phBody_GetExcel")

  // instead of trying to figure out if the file is done
  // downloading, let's just wait 5 seconds and see if
  // that works for now. shrug
  // const fileName = `${aid}-${year}.zip`
  await page.waitFor(5000);
  await browser.close();
}

config.sitesToScrape.forEach(site => {
  const { aid, entity } = site
  years.forEach((year) => {
    queue.add(async () => {
      console.log(`Downloading export for ${entity}, ${year}`)
      try {
        await downloadExport({ aid, year })
      } catch (e) {
        console.error(`Error downloading ${entity}, ${year}`)
      }
    })
  })
})

queue.onIdle().then(() => {
  console.log(`Step 1 done!`)
  process.exit(0)
})