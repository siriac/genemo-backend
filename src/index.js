import config from 'config';
import express from 'express';
import morgan from 'morgan';
import { initializeDB } from './db';
import errorHandler from './lib/error.handler';
import logger from './lib/logger';
import routes from './routes';
import { createServer } from "http";
import { Server } from "socket.io";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
const httpServer = createServer();
const app = express();
const io = new Server(httpServer, {
  cors: {
      //origin: "http://192.168.100.26:4200"
      origin: "*"
  }});
  global.io = io;
const port = config.get('port');
const port2 = config.get('port2');
const httpReqLogFormat =
  ':method :url :status :res[content-length] - :response-time ms';
const httpReqLogger = morgan(httpReqLogFormat, { stream: logger.stream });

// connect to database
initializeDB();

// middlewares
app.use((req, res, next) => {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://some-accepted-origin');//
  //res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

  /*const allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:9000', 'http://localhost:9000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }*/

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
  );
  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use(httpReqLogger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// routes
app.use('/', routes);

// error handling
app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Path not found!' });
});
io.on('connection', (socket) => {
  console.log(`a user connected socket.id ${socket.id}`);
  socket.on('disconnect', async function (data) {
    console.log("disconnect "+socket)
	});
});

httpServer.listen(port, () => {
  console.log('listening to port', port);
});
app.listen(port2, () => {
  console.log('listening to port', port2);
});
