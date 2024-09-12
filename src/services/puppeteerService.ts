import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import chromium from "chrome-aws-lambda";
import puppeteer from 'puppeteer-core';
puppeteerExtra.use(StealthPlugin());

export class puppeteerService {
  async puppeteerRun(searchquery: string) {
    // const browser = await puppeteer.launch({
    //     headless: true,
    //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
    //   });
    const browser = await puppeteerExtra.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });
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
