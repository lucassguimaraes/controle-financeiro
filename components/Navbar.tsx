
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-800 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to={APP_ROUTES.HOME} className="text-2xl font-bold hover:text-slate-300 transition-colors duration-200">
          Controle Financeiro
        </Link>
        <div className="space-x-4 md:space-x-6 mt-2 md:mt-0">
          <Link to={APP_ROUTES.HOME} className="text-lg hover:text-slate-300 transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-slate-300">
            Início
          </Link>
          <Link to={APP_ROUTES.ABOUT} className="text-lg hover:text-slate-300 transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-slate-300">
            Sobre
          </Link>
          <Link to={APP_ROUTES.PRIVACY} className="text-lg hover:text-slate-300 transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-slate-300">
            Privacidade
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
