const fs = require("fs")
const path = require("path")

const puppeteer = require("puppeteer")

const downloadPath = path.join(__dirname, "../../tmp")

async function downloadNetfile({ agencyId, year }) {
  const goToUrl = async (u) => {
    await page.goto(u)
    return page
  }
  const downloadPageUrl = `https://public.netfile.com/pub2/Default.aspx?aid=${agencyId}`
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
  await page.waitForTimeout(5000)
  await browser.close()
}

module.exports = downloadNetfile
