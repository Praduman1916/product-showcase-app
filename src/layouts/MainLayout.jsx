import React from 'react';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </>
  );
};

export default MainLayout;
