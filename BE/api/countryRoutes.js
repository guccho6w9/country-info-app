// api/countryRoutes.js
const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

router.get("/available", countryController.getAvailableCountries);
router.get("/info/:countryCode", countryController.getCountryInfo);

module.exports = router;
