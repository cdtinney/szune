if (process.env.NODE_ENV !== 'production') {
  // Load .env file for variables in dev environments only.
  // The file must be in the server package directory.
  // eslint-disable-next-line global-require
  require('dotenv').load();
}

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const logger = require('./logger');

const mongoDB = require('./database/mongoDB');
const routes = require('./routes/index');
const paths = require('./config/paths');
const configurePassport = require('./auth/configurePassport');

module.exports = function initApp() {
  function gracefulShutdown() {
    mongoDB.disconnect();
  }

  const app = express();

  app.use(cookieParser());

  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      // Persist cookies for a year. By default, cookies
      // are not persistent and will be lost upon certain
      // conditions like browsers exiting.
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
    resave: true,
    saveUninitialized: false,
    // Automatically extends the session age on each request.
    rolling: true,
    // Use MongoDB to store sessions.
    store: new MongoStore({
      mongooseConnection: mongoDB.mongoose.connection,
    }),
    // If `req.session` is unset, destroy the session in the DB.
    unset: 'destroy',
  }));

  // Initialize Passport.js for authentication of users.
  app.use(passport.initialize());
  app.use(passport.session());
  configurePassport(passport);

  // Add HTML routes (for production and integration testing).
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv === 'production' || nodeEnv === 'integration') {
    logger.info(`Serving static files from ${paths.clientBuildFolder}`);
    // Serve static React files from root.
    app.use('/', express.static(paths.clientBuildFolder));
  }

  // Add API routes.
  app.use('/api', routes);

  // Connect to the DB.
  mongoDB.connect();

  // This will handle process.exit():
  process.on('exit', gracefulShutdown);

  // This will handle kill command CTRL+C
  process.on('SIGINT', gracefulShutdown);

  return app;
};
