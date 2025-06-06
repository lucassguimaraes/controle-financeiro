
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl max-w-3xl mx-auto my-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800">Política de Privacidade</h1>
        <p className="text-sm text-gray-600 mt-2">Última atualização: {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </header>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">1. Introdução</h2>
          <p>
            Bem-vindo à Política de Privacidade do aplicativo Controle Financeiro ("nós", "nosso"). Nós respeitamos sua privacidade e estamos comprometidos em proteger suas informações pessoais. Esta política de privacidade explicará como coletamos, usamos, armazenamos e protegemos seus dados quando você utiliza nosso aplicativo. Ao utilizar nosso aplicativo, você concorda com a coleta e uso de informações de acordo com esta política.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">2. Informações que Coletamos</h2>
          <p className="mb-2">
            Coletamos os seguintes tipos de informações:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Dados de Transações Financeiras:</strong> Detalhes das suas receitas e despesas que você insere no aplicativo (descrição, valor, data, categoria, etc.). Estes dados são primariamente armazenados localmente no seu dispositivo ou navegador (utilizando, por exemplo, Local Storage).
            </li>
            <li>
              <strong>Dados de Uso (Opcional/Anônimo):</strong> Podemos coletar informações anônimas sobre como você interage com o aplicativo (por exemplo, recursos mais utilizados, frequência de uso, erros encontrados). Estes dados são utilizados exclusivamente para melhorar a funcionalidade e a experiência do usuário e não são vinculados à sua identidade pessoal.
            </li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">3. Como Usamos Suas Informações</h2>
          <p className="mb-2">
            Usamos as informações que coletamos para:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Fornecer, operar e manter a funcionalidade principal do aplicativo de controle financeiro.</li>
            <li>Permitir que você organize, analise e gerencie suas finanças pessoais.</li>
            <li>Melhorar, personalizar e expandir nosso aplicativo com base no feedback e nos padrões de uso (anônimos).</li>
            <li>Entender e analisar como você usa nosso aplicativo para otimizar a interface e os recursos.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">4. Armazenamento e Segurança dos Dados</h2>
          <p>
            Seus dados financeiros inseridos no aplicativo são, por padrão, armazenados localmente no seu dispositivo (por exemplo, usando o armazenamento local do navegador). Não temos acesso direto a esses dados, a menos que você opte por utilizar um recurso de sincronização em nuvem (se oferecido no futuro), caso em que medidas de segurança adicionais específicas serão comunicadas. Você é responsável por manter a segurança do dispositivo onde o aplicativo é utilizado.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">5. Compartilhamento de Informações</h2>
          <p>
            Nós não vendemos, comercializamos, alugamos ou de outra forma transferimos suas informações de identificação pessoal para terceiros. Os dados financeiros que você insere são para seu uso exclusivo dentro do aplicativo. Dados de uso anônimos podem ser agregados e utilizados para fins estatísticos ou de melhoria do produto, mas não conterão informações que possam identificá-lo.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">6. Seus Direitos de Privacidade</h2>
          <p>
            Como os dados são armazenados predominantemente de forma local, você tem controle direto sobre eles. Você pode adicionar, modificar ou excluir seus dados financeiros diretamente no aplicativo a qualquer momento. Se desejar remover todos os dados, geralmente isso pode ser feito limpando os dados do site nas configurações do seu navegador para este aplicativo.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">7. Privacidade de Crianças</h2>
          <p>
            Nosso aplicativo não se destina a menores de 13 anos. Não coletamos intencionalmente informações de identificação pessoal de crianças menores de 13 anos. Se você é pai ou responsável e sabe que seu filho nos forneceu informações pessoais, entre em contato conosco.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">8. Alterações nesta Política de Privacidade</h2>
          <p>
            Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página e atualizando a data da "Última atualização". Aconselhamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">9. Contato</h2>
          <p>
            Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através de [seu-email-de-contato@example.com] ou pelo formulário de contato disponível em nosso site (se aplicável).
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
