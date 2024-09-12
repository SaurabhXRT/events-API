import { puppeteerService } from "./puppeteerService.js";
//import logger from "../logger/logger.js";
import { BookMyshow } from "../resource/bookmyshow.js";
import { InsiderIN } from "../resource/insider.in.js";
import { Allevents } from "../resource/allevents.js";
import {
  isBookMyShowUrl,
  isInsiderInUrl,
  isAlleventsUrl,
} from "../helpers/urlHelpers.js";
const service = new puppeteerService();
const bookmyshowservice = new BookMyshow();
const insiderinservice = new InsiderIN();
const alleventsservice = new Allevents();

export class SearchService {
  async searchService(query: string) {
    try {
      const response = await service.puppeteerRun(query);
      if (response.length == 0) {
        return "no result found";
      }

    const results = [];

    for(const url of response) {
        if (isBookMyShowUrl(url)) {
          console.log(`Processing BookMyShow URL: ${url}`);
          const events = await bookmyshowservice.scrapeBookMyShow(url);
          results.push(...events);
        } else if (isInsiderInUrl(url)) {
          console.log(`Processing InsiderIN URL: ${url}`);
          const events = await insiderinservice.scrapeInsiderIn(url);
          results.push(...events);
        } else if (isAlleventsUrl(url)) {
          console.log(`Processing Allevents URL: ${url}`);
          const events = await alleventsservice.scrapeAllevents(url);
          results.push(...events);
        }
      };
      //console.log(results);
      return results;
    } catch (error) {
      console.log(error);
      throw new Error("error while getting events data");
    }
  }
}
