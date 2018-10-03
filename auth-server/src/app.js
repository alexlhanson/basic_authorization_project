'use strict';
//3rd party imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//import paths
import authRouter from './auth/router.js';
import errorHandler from './middleware/errHandler';
import notFound from './middleware/notFound';

//start express
let app = express();

//start middleware for handling http requests
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing middleware
app.use(authRouter);
app.use(errorHandler);
app.use(notFound);

//server starting/stopping function
let server = false;

app.start = (port) => {
  if (server) console.log('Server is already running');
  else {
    app.listen(port, err => {
      if (err) throw err;
      server = true;
      console.log(`server is up and running on port ${process.env.PORT}`);
    });
  }
};

app.stop = (port) => {
  app.close(() => {
    console.log(`server has been shut down`);
    server = false;
  });
};

module.exports = app;