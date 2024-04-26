require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { sequelize } = require('./models');
const cors = require('cors');
const xss = require('xss-clean');
const hpp = require('hpp');
const chalk = require('chalk');
const passport = require('passport');
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const routes = require('./routes');
const serveStatic = require('serve-static');
const { protect } = require('./middlewares/authentication');

const port = process.env.PORT || 5000;

const app = express();

// mysql session store
const options = {
  connectionLimit: 10,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.MYSQL_DB,
  host: process.env.DB_HOST,
  createDatabaseTable: true,
  expiration: 1000 * 60 * 60 * 24 * 7,
  clearExpired: true
};
const sessionStore = new mysqlStore(options);

// Force https
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.hostname + req.url);
  }
  next();
});

// Sessions
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Body parser
app.use(express.json());
// CORS
app.use(cors());
// Prevent XSS attacks
app.use(xss());
// Prevent http param pollution
app.use(hpp());

/* == routes == */
app.use(routes);

// changelog for FE
app.use('/api/v1/changelog', (req, res) => {
  // TODO: add to changelog
  const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
  res.send(changelog);
});

// serve FE
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(serveStatic(path.join(__dirname, 'client/dist')));
  app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, 'client/dist/index.html')));
}

app.listen(port, async () => {
  console.log(chalk.blue(`Listening on Port ${port}`));
  try {
    // db
    await sequelize.authenticate();
    console.log(chalk.green('Database connected!'));
  } catch (error) {
    console.log(error);
  }
});
