// services/countryService.tsx
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/countries'; 

export const fetchAvailableCountries = async () => {
  const response = await axios.get(`${API_URL}/available`);
  return response.data;
};

export const fetchCountryInfo = async (countryCode: string) => {
  try {

    const response = await axios.get(`${API_URL}/info/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country info for ${countryCode}: ${error}`);
    throw error;
  }
};
