// components/Header.tsx
import React from 'react';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/'); 
  };

  return (
    <header className="fixed top-0 left-0 right-0 p-6 bg-blue-600 text-white rounded-b-lg shadow-md max-w-2xl mx-auto transition-colors duration-200 hover:bg-blue-700 z-10">
      <div className="flex items-center justify-center">
        <img
          src="/globe-icon.svg" 
          alt="Globe Logo"
          className="cursor-pointer w-10 h-10" 
          onClick={handleLogoClick}
        />
      </div>
    </header>
  );
};

export default Header;
