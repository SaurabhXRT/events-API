import server from "./app.js";
//import logger from "./logger/logger.js";
import dotenv from "dotenv-flow";
dotenv.config();
import { generateApiKey } from "./helpers/apikeyGenerator.js";
generateApiKey();


//const PORT = process.env.PORT || 3000;

import { createServer } from "http";
const httpServer = createServer(server);

httpServer.listen(process.env.PORT, () => {
  console.log("Server started listening on " + process.env.PORT);
  //logger.log("Server started listening on " + process.env.PORT);
});

