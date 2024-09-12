import express  from "express";
const router = express.Router();
import logger from "../logger/logger.js";
import { SearchService } from "../services/searchService.js";
import { redisGetAsync, redisSetAsync } from "../redis/redis.js";
import { isValidQuery } from "../helpers/urlHelpers.js";
const service = new SearchService();

router.get("/search", async(req:any,res:any) => {
    const { query } = req.query;
    if(!query){
        return res.status(401).json({
            message: " search query required",
        });
    }
    if (!isValidQuery(query)) {
        return res.status(400).json({
          message: 'Invalid query format. Please use a query like "events in cityname".'
        });
    }
    const cachekey = `redisquery:${query}`;

    try {
        const cachedData = await redisGetAsync(cachekey);
        if(cachedData){
            const response = await JSON.parse(cachedData);
            return res.status(200).json({
                message: "search result fetched succesfully",
                data: response
            });
        }
        const response = await service.searchService(query);
        await redisSetAsync(cachekey, JSON.stringify(response), 'EX', 18000);
        return res.status(200).json({
            message: "search result fetched succesfully",
            data: response,
        });
    }catch(error){
        logger.log(error);
        res.status(500).json({
            message: "internal server error occured",
        });
    }
});

export default router;