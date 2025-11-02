const express = require('express');
const VisitsController = require('./controllers/visits.controller');
const { validateCountry } = require('./middlewares/validateCountry');

const routes = express.Router();

// visits
routes.post('/visits', validateCountry, VisitsController.postVisit);
routes.get('/visits', VisitsController.getVisits);

module.exports = routes;
