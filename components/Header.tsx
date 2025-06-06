import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="text-center py-6 print:py-2">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700">{title}</h1>
    </header>
  );
};

export default Header;
