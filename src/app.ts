import express, { Request, Response } from "express";
import cors from "cors";
//import logger from "./logger/logger.js";
import bodyParser from "body-parser";
import searchroutes from "./routes/search.js";

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  cors({
    origin: process.env.CORS_WHITELISTED,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  })
);

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "HEAD, OPTIONS, GET, POST, PUT, PATCH, DELETE, CONNECT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

server.use("/v1", searchroutes);
server.get("/", async(req:any,res:any) => {
  return res.status(200).json({
    message: "server is running"
  });
});

process.on("uncaughtException", (err) => {
  console.error("An error occured which was not caught");
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error("An  unhandled rejection was caught");
  console.error(err);
});

export default server;