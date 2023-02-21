const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cookieParser());


const auth = require('./routers/auth');



const products = require('./routers/product');

const errorMiddleware = require('./middlewares/error');

app.use('/api/v1',products);

app.use('/api/v1',auth);

app.use(errorMiddleware)








module.exports = app;