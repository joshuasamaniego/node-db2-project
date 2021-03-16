// DO YOUR MAGIC
const express = require('express');
const router = express.Router();
const Cars = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');


router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll();
        res.json(cars);
    } catch(err) { next(err) }
})

router.get('/:id', checkCarId, (req, res, next) => {
    console.log(req.carId);
    res.json(req.carId);
    next();
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body);
        res.json(newCar);
    } catch(err) { next(err) }
})

router.use((err, req, res, next) => { // eslint-disable-line
    // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
    res.status(500).json({
      message: 'something went wrong inside the accounts router',
      errMessage: err.message,
    })
})


module.exports = router;