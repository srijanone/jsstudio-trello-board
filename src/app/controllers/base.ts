const axios = require("axios").default;

const api = axios.default.create({
  baseURL: process.env.API_PATH,
});

api.interceptors.request.use((config: any) => {
  config.params = config.params || {};
  config.params["key"] = process.env.API_KEY;
  config.params["token"] = process.env.API_TOKEN;
  return config;
});
