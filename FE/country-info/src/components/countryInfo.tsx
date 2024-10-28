import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchAvailableCountries } from '@/services/countryService';

const CountryInfo: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchAvailableCountries();
        console.log("Fetched Countries:", data); // Verificar datos obtenidos
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error("Error fetching available countries:", error);
      }
    };

    getCountries();
  }, []);

  const handleCountrySelect = (countryCode: string) => {
    console.log("Selected country code:", countryCode);
    router.push(`/countries/${countryCode}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Available Countries</h1>
      <ul className="space-y-4">
        {Array.isArray(countries) && countries.map((country: any) => (
          <li 
            key={country.countryCode} 
            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-blue-100 transition-colors duration-200"
          >
            <button 
              onClick={() => handleCountrySelect(country.countryCode)} 
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            >
              <span className="text-lg font-medium">{country.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryInfo;
