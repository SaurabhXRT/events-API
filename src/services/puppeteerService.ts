// import puppeteer from "puppeteer-extra";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";
// puppeteer.use(StealthPlugin());

import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export class puppeteerService {
  async puppeteerRun(searchquery: string) {
    let options = {};
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
    const browser = await puppeteer.launch(options);
   
    // const browser = await puppeteer.launch({
    //     headless: true,
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   });
    const page = await browser.newPage();

    console.log(`Starting to search by: ${searchquery}`);
    const url = `https://www.google.com/search?q=${searchquery}`;

    await page.goto(url, { waitUntil: "networkidle2" });

    const hrefs = await this.ScanforLinks(page);
    await browser.close();
    return hrefs;
  }

  async ScanforLinks(page: any) {
    return page.evaluate(() => {
      const anchors = Array.from(
        document.querySelectorAll<HTMLAnchorElement>("a")
      );
      const hrefs = anchors
        .map((anchor) => anchor.href)
        .filter((href) => href.includes("http") && !href.includes("google"));
      console.log(hrefs);
      return hrefs;
    });
  }
}
