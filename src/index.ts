import * as http from 'http';
import { app } from './app';
import { Logger } from './lib/logger';
// Composition root
const axios = require("axios").default;
let api =  axios.default.create({});

const startServer = () => {
  const logger: any = new Logger();
  const server = http.createServer(app).listen(parseInt(process.env.PORT || '8089', 10));
  
  server.on('listening', async () => {
    logger.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
    logger.log('info', `starting treello server with apitoken  ${process.env.API_TOKEN} & path ${process.env.API_PATH} `);
    logger.log('info', `starting treello server with apikey ${process.env.API_KEY}`);
    api = axios.default.create({
      baseURL: process.env.API_PATH,
    });
    
    api.interceptors.request.use((config: any) => {
      config.params = config.params || {};
      config.params["key"] = process.env.API_KEY;
      config.params["token"] = process.env.API_TOKEN;
      return config;
    });
  });
}

export { startServer, api };
