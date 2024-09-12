import { Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

interface EventDetails {
  title: string;
  venue: string;
  type: string;
  price: string;
  imageUrl: string;
  link: string;
  moreinformation?: string;
  eventTime?: string;
  description?: string;
}

export class BookMyshow {
  async scrapeBookMyShow(url: any): Promise<EventDetails[]> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const events = await this.scrapeBookMyShowMainPage(page);

    for (const event of events) {
      if (event.link) {
        const details = await this.scrapeBookMyShowEventPage(
          browser,
          event.link
        );
        event.moreinformation = details.moreinformation;
        event.eventTime = details.eventTime;
        event.description = details.description;
      }
    }
    await page.close();
    return events;
  }

  async scrapeBookMyShowMainPage(page: Page): Promise<EventDetails[]> {
    const selectorExists = await page.evaluate(() => {
      return document.querySelector(".kLLnFs") !== null;
    });
    if(!selectorExists){
      return [];
    }
    await page.waitForSelector(".kLLnFs");
    await page.click(".kLLnFs");
    const events: EventDetails[] = await page.evaluate(() => {
      const eventCards = document.querySelectorAll(
        "a.commonStyles__LinkWrapper-sc-133848s-11"
      );
      return Array.from(eventCards).map((card) => {
        const title = card.querySelector(".dxpBCo")?.textContent || "";
        const venue = card.querySelector(".fUgjVu")?.textContent || "";
        const typeElements = card.querySelectorAll(".dgMmMO");
        const type = typeElements[0]?.textContent || "No type";
        const price = typeElements[1]?.textContent || "No price";
        const link = (card as HTMLAnchorElement).href || "";
        const imageUrl = card.querySelector("img")?.src || "";

        console.log(link);
        console.log(card.outerHTML);

        return { title, venue, type, price, imageUrl, link };
      });
    });
    return events;
  }

  async scrapeBookMyShowEventPage(browser: any, eventLink: any) {
    try {
      const page = await browser.newPage();
      await page.goto(eventLink, { waitUntil: "networkidle2" });
      await page.waitForSelector(".df-aw");

      const eventDetails = await page.evaluate(() => {
        const moreinformation =
          document.querySelector(".df-at")?.textContent || "No title";
        const eventTime =
          document.querySelector(".df-av")?.textContent || "No time";
        const description =
          document.querySelector(".df-eo p")?.textContent || "No description";
        return { moreinformation, eventTime, description };
      });

      await page.close();
      return eventDetails;
    } catch (error) {
      console.error(
        `Failed to scrape event page ${eventLink}: ${error.message}`
      );
      return { error: error.message };
    }
  }
}
