import { createClient } from 'redis';
import { promisify } from 'util';
import dotenv from "dotenv-flow";
dotenv.config();
var redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 15175
    },
    legacyMode: true
});
redisClient.connect().then(function() {
    console.log("redis connected successfully");
}).catch(function(error) {
    console.log(error);
});
redisClient.on('error', function(error) {
    console.log(error);
});
var redisGetAsync = promisify(redisClient.get).bind(redisClient);
var redisSetAsync = promisify(redisClient.set).bind(redisClient);
var redisDelAsync = promisify(redisClient.del).bind(redisClient);
export { redisGetAsync, redisSetAsync, redisDelAsync };
