// controllers/countrycontrollers.js
const countryService = require("../services/countryService");

exports.getAvailableCountries = async (req, res) => {
  try {
    const countries = await countryService.fetchAvailableCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching available countries" });
  }
};

exports.getCountryInfo = async (req, res) => {
  try {
    const { countryCode } = req.params;
    if (!countryCode) {
      return res.status(400).json({ message: "Country code is required." });
    }
    const countryInfo = await countryService.fetchCountryInfo(countryCode);
    res.json(countryInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching country info" });
  }
};
