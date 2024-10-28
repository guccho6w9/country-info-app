// api/index.js
const express = require("express");
const router = express.Router();
const countryRoutes = require("./countryRoutes");

router.use("/countries", countryRoutes);

module.exports = router;
