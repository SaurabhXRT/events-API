import crypto from "crypto";

const generateApiKey = () => {
  const key = crypto.randomBytes(32).toString("hex");
  console.log(key);
  return key;
};
export { generateApiKey };
