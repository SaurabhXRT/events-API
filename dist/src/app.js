import express from "express";
import cors from "cors";
import logger from "./logger/logger.js";
import bodyParser from "body-parser";
import searchroutes from "./routes/search.js";
var server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(express.json());
server.use(cors({
    origin: process.env.CORS_WHITELISTED,
    methods: [
        "GET",
        "HEAD",
        "PUT",
        "PATCH",
        "POST",
        "DELETE",
        "OPTIONS"
    ]
}));
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, OPTIONS, GET, POST, PUT, PATCH, DELETE, CONNECT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
server.use("/v1", searchroutes);
process.on("uncaughtException", function(err) {
    logger.error("An error occured which was not caught");
    logger.error(err);
});
process.on("unhandledRejection", function(err) {
    logger.error("An  unhandled rejection was caught");
    logger.error(err);
});
export default server;
