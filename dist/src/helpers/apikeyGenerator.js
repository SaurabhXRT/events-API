import crypto from "crypto";
var generateApiKey = function() {
    var key = crypto.randomBytes(32).toString("hex");
    console.log(key);
    return key;
};
export { generateApiKey };
