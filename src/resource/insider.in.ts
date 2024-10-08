import { Page } from "puppeteer";
// import puppeteer from "puppeteer-extra";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";
// puppeteer.use(StealthPlugin());

import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";



interface EventDetails {
  title: string;
  venue: string;
  price: string;
  imageUrl: string;
  link: string;
  moreinformation?: string;
  eventTime?: string;
  description?: string;
}

export class InsiderIN {
  async scrapeInsiderIn(url: any): Promise<EventDetails[]> {
    try {
      
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
      page.setDefaultNavigationTimeout(60000);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      const events = await this.scrapeInsiderInMainPage(page);

      await page.close();
      return events;
    } catch (error) {
      // console.log(error);
      return [];
    }
  }

  async scrapeInsiderInMainPage(page: Page): Promise<EventDetails[]> {
    try {

   
    const selectorExists = await page.evaluate(() => {
      return document.querySelector(".card-list") !== null;
    });
    if (!selectorExists) {
      return [];
    }
    await page.waitForSelector(".card-list");
    await page.click(".card-list");
    const events = await page.evaluate(() => {
      const eventCards = document.querySelectorAll(".card-list-item");
      return Array.from(eventCards).map((card) => {
        const title = card.querySelector(".css-17ztqjg")?.textContent || "";
        const eventTime =
          card.querySelector('div[data-ref="event_card_date_string"] p')
            ?.textContent || "";
        const venue =
          card.querySelector('div[data-ref="event_card_location"] p')
            ?.textContent || "";
        const link = card.querySelector("a")?.href || "";
        const imageUrl = card.querySelector("img")?.src || "";
        const price = card.querySelector(".css-1sh8h77")?.textContent || "";

        console.log(link);
        console.log(card.outerHTML);

        return { title, venue, price, imageUrl, eventTime, link };
      });
    });
    return events;
  }catch(error){
    // console.log(error);
    return [];
  }
  }
}
