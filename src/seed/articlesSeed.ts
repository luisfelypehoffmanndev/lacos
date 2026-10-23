import { Article } from '../store/types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Desregulação Sensorial e Crises: O que Fazer Sem Esquecer de Si Mesmo(a)',
    tag: 'Manejo & Autocuidado',
    category: 'crise',
    readTimeMinutes: 3,
    authorName: 'Dra. Karen Kotlewski',
    authorCRP: 'CRP 07/34912',
    date: '20 de Outubro de 2026',
    summary: 'Aprenda a reconhecer a sobrecarga antes do colapso (meltdown) e descubra como manter sua própria autorregulação emocional durante momentos críticos.',
    paragraphs: [
      'A desregulação sensorial em pessoas neurodivergentes não é birra nem desobediência; trata-se de uma resposta neurológica involuntária à saturação de estímulos (sons, luzes, toques ou exigências cognitivas).',
      'Quando o colapso ocorre, o cuidador tende a entrar em estado de alerta máximo, liberando cortisol e adrenalina. O primeiro passo para acolher a crise não é conter a criança ou o familiar, mas regular o seu próprio padrão respiratório. A sua calma física funciona como um co-regulador neurológico.',
      'Reduza estímulos imediatos: diminua a luz, abaixe o volume de vozes e evite fazer perguntas complexas no momento agudo. Aguarde a curva de estresse baixar para dialogar.',
      'Lembre-se: sentir-se exausto(a) e com vontade de chorar após uma crise não é fraqueza; é o desgaste natural de um sistema simpático ativado por tempo prolongado.'
    ],
    references: [
      'MISQUIATTI, Andréa Regina Nunes et al. Sobrecarga familiar e crianças com transtornos do espectro do autismo. Revista CEFAC, 2015.',
      'Manual de Manejo Comportamental e Sensorial na Infância Atípica — FASA, 2026.'
    ],
    disclaimer: 'Este conteúdo tem finalidade estritamente informativa e educativa. Ele não substitui avaliação nem intervenção profissional especializada. Em caso de sofrimento agudo, procure apoio.',
    audioAvailable: true,
  },
  {
    id: 'art-2',
    title: 'O Mito do "Cuidador Infalível": Validando o Cansaço e a Culpa',
    tag: 'Saúde Mental do Cuidador',
    category: 'autocuidado',
    readTimeMinutes: 4,
    authorName: 'Lucas Daniel Jung',
    authorCRP: 'CRP 07/31045',
    date: '18 de Outubro de 2026',
    summary: 'A romantização da dedicação exclusiva gera solidão e burnout. Entenda como o autocuidado é condição básica para a sustentabilidade do vínculo.',
    paragraphs: [
      'Na cultura brasileira, o cuidado familiar é frequentemente romantizado com frases como "você é uma fortaleza" ou "Deus escolheu você porque você aguenta". Embora bem-intencionadas, essas afirmações silenciam a exaustão legítima de quem cuida.',
      'A literatura em psicologia demonstra que a sobrecarga crônica do cuidador sem pausas programadas conduz a quadros depressivos, dores crônicas e sensação de anulação da própria identidade.',
      'Estabelecer limites e pedir ajuda à rede de apoio ou aos serviços de saúde não é negligência; é a única garantia de que o cuidado continuará sendo saudável e seguro.',
      'Fazer o possível no dia de hoje já é um ato de dignidade imenso.'
    ],
    references: [
      'HEGENBERG, Mauro. Psicoterapia breve. 2. ed. São Paulo: Casa do Psicólogo, 2004.',
      'Conselho Federal de Psicologia (CFP). Resolução nº 13/2022.'
    ],
    disclaimer: 'Publicação educativa produzida no âmbito do projeto Laços. Não substitui psicoterapia individual.',
    audioAvailable: true,
  },
  {
    id: 'art-3',
    title: 'Escola Inclusiva e Adaptação Curricular (PEI): Seus Direitos Garantidos',
    tag: 'Direitos & Legislação',
    category: 'direitos',
    readTimeMinutes: 4,
    authorName: 'Joiciele Oliveira',
    authorCRP: 'CRP 07/28901',
    date: '15 de Outubro de 2026',
    summary: 'Conheça a Lei Brasileira de Inclusão (LBI) e entenda como exigir o Plano de Ensino Individualizado (PEI) sem sofrer retaliações.',
    paragraphs: [
      'A Lei nº 13.146/2015 (LBI) e a Lei Berenice Piana (Lei nº 12.764/2012) asseguram expressamente o direito à matrícula em escola regular sem cobrança de taxas extras, além do fornecimento de profissional de apoio escolar sempre que houver necessidade comprovada.',
      'O Plano Educacional Individualizado (PEI) deve ser construído em colaboração com a família e a equipe de terapeutas, estabelecendo metas reais e adaptadas ao perfil cognitivo e sensorial do aluno.',
      'Dificuldades ou negativas por parte da gestão escolar devem ser registradas por escrito e, se necessário, notificadas aos conselhos tutelares e ao Ministério Público.'
    ],
    references: [
      'Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência) - Lei nº 13.146/2015.',
      'NOVAIS, Mirlene Carvalho; SILVA, Gabriela. Prestação de serviços mediados por TDICs. Psicologia USP, 2025.'
    ],
    disclaimer: 'Orientações de caráter informativo com base na legislação brasileira vigente.',
    audioAvailable: true,
  },
  {
    id: 'art-4',
    title: 'Transições e Mudanças de Rotina no TDAH e Autismo: Antecipação Visual',
    tag: 'Rotina Cotidiana',
    category: 'escola',
    readTimeMinutes: 3,
    authorName: 'Natalia Santiago',
    authorCRP: 'CRP 07/39211',
    date: '12 de Outubro de 2026',
    summary: 'Estratégias de antecipação e previsibilidade para reduzir crises de ansiedade antes de mudanças na dinâmica familiar.',
    paragraphs: [
      'Para cérebros atípicos, a incerteza provoca aumento drástico dos níveis de ansiedade. Pequenas alterações, como mudar o caminho da escola ou receber visitas sem aviso, podem desencadear reações defensivas intensas.',
      'O uso de agendas visuais, histórias sociais e alertas temporais ("daqui a 10 minutos vamos desligar o videogame para almoçar") constrói uma ponte de segurança cognitiva.',
      'Comunicação visual e previsibilidade são pontes de tranquilidade tanto para quem é cuidado quanto para quem organiza o lar.'
    ],
    references: [
      'Cadernos de Acessibilidade Cognitiva e Neurodiversidade — FASA/CFP, 2026.'
    ],
    disclaimer: 'Conteúdo informativo. Em demandas clínicas persistentes, consulte um profissional qualificado.',
    audioAvailable: true,
  }
];
