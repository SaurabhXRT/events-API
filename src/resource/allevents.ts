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

export class Allevents {
  async scrapeAllevents(url: any): Promise<EventDetails[]> {
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
      const events = await this.scrapAlleventsMainPage(page);
      await page.close();
      return events;
    } catch (error) {
      // console.log(error);
      return [];
    }
  }

  async scrapAlleventsMainPage(page: Page): Promise<EventDetails[]> {
    try {
      const selectorExists = await page.evaluate(() => {
        return document.querySelector(".event-card-parent") !== null;
      });
      if (!selectorExists) {
        return [];
      }

      await page.waitForSelector(".event-card-parent");
      await page.click(".event-card-parent");

      const events = await page.evaluate(() => {
        const eventCards = document.querySelectorAll(".event-card");

        return Array.from(eventCards).map((card) => {
          const title =
            card.querySelector(".title a h3")?.textContent.trim() || "";
          const eventTime =
            card.querySelector(".meta-bottom .date")?.textContent.trim() || "";
          const venue =
            card.querySelector(".subtitle")?.textContent.trim() || "";
          const link =
            (card.querySelector(".title a") as HTMLAnchorElement)?.href || "";
          let imageUrl = (card.querySelector(".banner-cont") as HTMLElement)
            ?.style.backgroundImage;
          imageUrl = imageUrl
            ? imageUrl.match(/url\("(.+?)"\)/)?.[1] || ""
            : "";
          const price =
            card.querySelector(".price-container .price")?.textContent.trim() ||
            "";

          return { title, venue, price, imageUrl, eventTime, link };
        });
      });

      return events;
    } catch (error) {
      // console.log(error);
      return [];
    }
  }
}
