const axios = require("axios");

const NAGER_API_URL = "https://date.nager.at/api/v3";
const COUNTRIES_NOW_API_URL = "https://countriesnow.space/api/v0.1";
const REST_COUNTRIES_API_URL = "https://restcountries.com/v3.1";

exports.fetchCountryInfo = async (countryCode) => {
  if (!countryCode) {
    console.error("Country code is required");
    throw new Error("Country code is required");
  }

  console.log(`Fetching country info for: ${countryCode}`);

  try {
    // Obtener el código ISO3 usando REST Countries
    const restCountriesResponse = await axios.get(`${REST_COUNTRIES_API_URL}/alpha/${countryCode}`);
    const iso3Code = restCountriesResponse.data[0]?.cca3 || ""; // ISO3 obtenido

    if (!iso3Code) {
      console.warn(`No se encontró el código ISO3 para el país con código ISO2: ${countryCode}`);
      return { message: "Country ISO3 code not found" };
    }

    // Obtener información del país de Nager API
    const countryInfoResponse = await axios.get(`${NAGER_API_URL}/CountryInfo/${countryCode}`);
    const countryInfo = countryInfoResponse.data;
    const borders = countryInfo.borders || [];

    // Obtener datos de población usando el código ISO3
    const populationResponse = await axios.get(`${COUNTRIES_NOW_API_URL}/countries/population`);
    const populationData = populationResponse.data.data;
    const countryPopulation = populationData.find(item => item.iso3 === iso3Code);
    const formattedPopulationData = countryPopulation ? countryPopulation.populationCounts : [];

    // Obtener la bandera usando ISO2
    const flagsResponse = await axios.get(`${COUNTRIES_NOW_API_URL}/countries/flag/images`);
    const flagData = flagsResponse.data.data;
    const countryFlag = flagData.find(flag => flag.iso2 === countryCode) || {};

    return {
      commonName: countryInfo.name || "No common name available",
      officialName: countryInfo.officialName || "No official name available",
      region: countryInfo.region || "No region available",
      borders,
      iso3Code,  // Incluyendo ISO3 en la respuesta
      populationData: formattedPopulationData.length > 0 ? formattedPopulationData : "No population data available",
      flagUrl: countryFlag.flag || 'No flag available',
    };

  } catch (error) {
    console.error(`Error fetching country info for ${countryCode}:`, error.response ? error.response.data : error.message);
    throw new Error(`Could not fetch country info for ${countryCode}.`);
  }
};
