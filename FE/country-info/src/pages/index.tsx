import React from 'react';
import '@/app/globals.css';
import CountryInfo from '@/components/countryInfo';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Country Information App</h1>
      <CountryInfo />
    </div>
  );
};

export default Home;
