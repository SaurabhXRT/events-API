import { createClient } from 'redis';
import { promisify } from 'util';
import dotenv from "dotenv-flow";
dotenv.config();

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 15175
    },
    legacyMode: true
});

redisClient.connect().then(() => {
    console.log("redis connected successfully");
}).catch((error) => {
    console.log(error);
});
redisClient.on('error', (error) => {
    console.log(error);
});

const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);
const redisDelAsync = promisify(redisClient.del).bind(redisClient);

export {redisGetAsync,redisSetAsync,redisDelAsync}