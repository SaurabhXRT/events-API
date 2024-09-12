import pino from "pino";

const developmentPinoOptions = {
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
};

function getDevelopmentPinoLogger(pinoOptions: any) {
  return pino(pinoOptions);
}

const errorLogger = getDevelopmentPinoLogger({
  ...developmentPinoOptions,
  level: "error",
});
const allLogger = getDevelopmentPinoLogger({
  ...developmentPinoOptions,
  level: "debug",
});

function log(message: any, data?: any) {
  allLogger.debug(data ? data : message, data ? message : undefined);
}

function error(err: any, message?: string) {
  errorLogger.error(err, message);
}

// function debug() {}

// function fatal() {}

// function warn() {}

let logger = { log, error };
export default logger;