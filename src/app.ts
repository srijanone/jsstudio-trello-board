const params = require('strong-params');
import bodyParser from 'body-parser';
import path from 'path';
import express from 'express';
import { NOT_FOUND_STATUS_CODE, NOT_FOUND_STATUS_MESSAGE } from './config/constants';
import { Logger } from './lib/logger';
import { middlewares } from './middlewares/error.handler';
import Routes from './routes/api';
const app = express();
const logger = new Logger();

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(params.expressMiddleware());
app.use(logger.getRequestLogger());
app.use(express.static(path.join(__dirname, "..", "client/build")));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use('/api', Routes);
app.get('/health', (req, res) => res.json({ status: true, message: 'Health OK!' }));

app.use(logger.getRequestErrorLogger());

app.use((req, res, next) => {
  const err = new Error(NOT_FOUND_STATUS_MESSAGE);
  res.statusCode = NOT_FOUND_STATUS_CODE;
  res.send(err.message);
});
app.use(middlewares.handleRequestError);
export { app };
