// components/Layout.tsx
import React from 'react';
import Header from '@/components/header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="mt-20"> {/* Asegúrate de que el contenido no esté detrás del header */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
