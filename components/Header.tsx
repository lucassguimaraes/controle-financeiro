
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="mb-6 md:mb-8 text-center print:mb-4">
      <h1 className="text-3xl md:text-4xl font-bold text-primary print:text-2xl">{title}</h1>
    </header>
  );
};

export default Header;
