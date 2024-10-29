import React from 'react';
import '@/app/globals.css';
import CountryInfo from '@/components/countryInfo';
import Header from '@/components/header';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <h1 className="text-center text-3xl font-bold">Country Information App</h1>
      <CountryInfo />
    </div>
  );
};

export default Home;
