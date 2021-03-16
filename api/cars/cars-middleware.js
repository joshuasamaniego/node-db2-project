const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const logger = (req, res, next) => {//eslint-disable-line
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const timeStamp = new Date().toLocaleTimeString('en-US', options);

  console.log(`Request Method: ${req.method}`)
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Time Stamp: ${timeStamp}`);
  next();
}

const checkCarId = async (req, res, next) => {
  try {
    const carId = await Cars.getById(req.params.id);
    if(!carId) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` })
    } else {
      req.carId = carId;
      next();
    }
  } catch(err) { next(err) }
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body;
  
  if(!vin) {
    res.status(400).json({ message: 'vin is missing' })
  } else if(!make) {
    res.status(400).json({ message: 'make is missing' })
  } else if(!model) {
    res.status(400).json({ message: 'model is missing' })
  } else if(!mileage) {
    res.status(400).json({ message: 'mileage is missing' })
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);
  if(!isValidVin) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const allCars = await Cars.getAll();
    const vinMatch = allCars.filter(car => car.vin === req.body.vin)
    if (vinMatch.length > 0) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next()
    }
  } catch(err) { next(err) }
}

module.exports = {
  logger, 
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
