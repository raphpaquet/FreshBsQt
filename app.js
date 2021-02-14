const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const logger = require('morgan');
const cors = require('cors');
const db = require('./db')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const stripeRouter = require('./routes/stripeRouter');
const productsRouter = require('./routes/products');
const dbhelpers = require('./helpers/dbhelpers');
const dbHelpers = require('./helpers/dbHelpers')(db);

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/products', productsRouter(dbHelpers));
app.use('/api/stripe/charge', stripeRouter());


module.exports = app;
