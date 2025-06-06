
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl max-w-3xl mx-auto my-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800">Sobre o Controle Financeiro</h1>
        <p className="text-slate-600 mt-2">Entenda nossa missão e como podemos te ajudar.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-700 mb-4 border-l-4 border-sky-500 pl-3">Nossa Missão</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Bem-vindo ao nosso aplicativo de Controle Financeiro! Nossa missão é capacitar você a gerenciar suas finanças pessoais de forma simples, intuitiva e eficaz, proporcionando clareza e controle sobre sua vida financeira.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-700 mb-4 border-l-4 border-sky-500 pl-3">Visão</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Acreditamos que o controle financeiro é a base para alcançar objetivos pessoais e viver com mais tranquilidade. Queremos ser a ferramenta de confiança que ajuda nossos usuários a tomar decisões financeiras mais inteligentes e conscientes, transformando a gestão de dinheiro em uma tarefa acessível a todos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-700 mb-4 border-l-4 border-sky-500 pl-3">Recursos Principais</h2>
        <div className="grid md:grid-cols-2 gap-6 text-lg text-gray-700 leading-relaxed">
          <div className="bg-slate-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-slate-800 mb-1">📊 Registro Simplificado</h3>
            <p>Adicione suas receitas e despesas de forma rápida e fácil.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-slate-800 mb-1">📈 Resumos Visuais</h3>
            <p>Acompanhe seu saldo, receitas e despesas com gráficos e relatórios claros.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-slate-800 mb-1">📱 Design Moderno</h3>
            <p>Interface amigável e intuitiva, otimizada para todos os dispositivos.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-slate-800 mb-1">💡 Educação Financeira (Em Breve)</h3>
            <p>Dicas e insights para melhorar sua saúde financeira.</p>
          </div>
        </div>
      </section>
      
      <section>
        <p className="text-lg text-gray-700 mt-8 leading-relaxed text-center">
          Agradecemos por escolher o Controle Financeiro! Estamos comprometidos em evoluir constantemente, adicionando novos recursos e aprimorando sua experiência. Seu feedback é essencial para nós!
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
