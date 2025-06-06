import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FinancialControlPage from './pages/FinancialControlPage'; // Changed from HomePage
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { APP_ROUTES } from './constants';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-slate-100 text-gray-800">
        <Navbar />
        <main className="flex-grow container mx-auto p-2 sm:p-4 md:p-6"> {/* Adjusted padding */}
          <Routes>
            <Route path={APP_ROUTES.HOME} element={<FinancialControlPage />} /> {/* Changed */}
            <Route path={APP_ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={APP_ROUTES.PRIVACY} element={<PrivacyPolicyPage />} />
            {/* Fallback route: redirect to home if no other route matches */}
            <Route path="*" element={<Navigate to={APP_ROUTES.HOME} replace />} /> {/* Changed to Navigate */}
          </Routes>
        </main>
        <footer className="bg-slate-800 text-white text-center p-4 mt-auto print:hidden">
          <p>&copy; {new Date().getFullYear()} Controle Financeiro. Todos os direitos reservados.</p>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
