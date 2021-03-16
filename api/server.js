const express = require("express");
const server = express();
const carsRouter = require('./cars/cars-router');
const { logger } = require('./cars/cars-middleware');

server.use(express.json());

server.use('/api/cars', logger, carsRouter);

// catch all error response
server.use((err, req, res, next) => {//eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
        custom: 'You hit the catch-all error message on server.js. You didnt hit a valid endpoint'
    })
})

module.exports = server
