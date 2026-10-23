import type { Conteudo } from '../estado/tipos';

/** Texto obrigatório ao fim de todo conteúdo (fichamento, item 16). */
export const AVISO_ETICO =
  'Este conteúdo tem finalidade informativa e educativa. Ele não substitui uma avaliação ou um acompanhamento psicológico individualizado. Cada pessoa possui necessidades e experiências próprias. Em caso de sofrimento psicológico, procure orientação profissional.';

const MISQUIATTI =
  'MISQUIATTI, A. R. N. et al. Sobrecarga familiar e crianças com transtornos do espectro do autismo: perspectiva dos cuidadores. Revista CEFAC, v. 17, n. 1, p. 192–200, 2015.';
const HEGENBERG = 'HEGENBERG, M. Psicoterapia breve. 2. ed. São Paulo: Casa do Psicólogo, 2004.';
const NOVAIS =
  'NOVAIS, M. C.; SILVA, G. A. Psicólogas(os) brasileiras(os) e prestação de serviços mediados por Tecnologias Digitais da Informação e Comunicação: regulamentações e desafios. Psicologia USP, v. 36, 2025.';

/**
 * Conteúdos fictícios assinados pelos psicólogos de demonstração.
 * Sem diagnóstico, sem prescrição, sem promessa de resultado (fichamento, item 16).
 */
export const CONTEUDOS: Conteudo[] = [
  {
    id: 'cansaco-de-quem-cuida',
    titulo: 'O cansaço de quem cuida não é fraqueza',
    resumo: 'Por que a exaustão aparece mesmo quando você "não fez nada de diferente" hoje.',
    categoria: 'Autocuidado',
    capa: '/img/capa-descanso.jpg',
    capaAlt: 'Pessoa dormindo com o rosto apoiado no travesseiro',
    minutos: 3,
    psicologoId: 'ana-souza',
    publicadoEm: '2026-10-20',
    paragrafos: [
      'Quem cuida de uma pessoa neurodivergente ou com um transtorno psicológico costuma carregar mais do que as tarefas visíveis. Há a agenda de terapias, as conversas com a escola, a atenção constante a sinais de crise e a preocupação com o futuro. Esse trabalho mental raramente aparece, mas consome energia todos os dias.',
      'Pesquisas com cuidadores de crianças com autismo descrevem essa sobrecarga como algo frequente e que afeta a saúde, o trabalho e as relações de quem cuida. Sentir cansaço, portanto, não é sinal de que você está fazendo algo errado. É uma resposta compreensível a uma rotina exigente.',
      'Reconhecer o próprio limite não é desistir de quem você cuida. Pode ser o primeiro passo para pedir ajuda, dividir tarefas ou buscar um espaço de escuta só seu.',
      'Se o cansaço vier acompanhado de tristeza persistente, alterações de sono ou a sensação de não ter mais saída, vale procurar um profissional. Você também merece cuidado.',
    ],
    referencias: [MISQUIATTI],
  },
  {
    id: 'culpa',
    titulo: 'Culpa: a visita que chega sem avisar',
    resumo: 'Sobre a culpa que aparece quando você descansa, se irrita ou sente vontade de sumir.',
    categoria: 'Emoções',
    capa: '/img/capa-escrita.jpg',
    capaAlt: 'Caneta-tinteiro escrevendo em uma folha pautada',
    minutos: 4,
    psicologoId: 'beatriz-lemos',
    publicadoEm: '2026-10-17',
    paragrafos: [
      'Muitos familiares descrevem uma culpa que surge nos momentos mais variados: ao tirar uma hora para si, ao perder a paciência, ao sentir alívio quando a pessoa cuidada dorme. É comum que essa culpa venha acompanhada da ideia de que "uma boa mãe" ou "um bom filho" não deveria sentir isso.',
      'Sentimentos ambivalentes — amor e cansaço, dedicação e raiva — fazem parte de relações de cuidado intensas. Ter esses sentimentos não diz nada sobre o seu caráter nem sobre o quanto você se importa.',
      'Falar sobre a culpa com pessoas que vivem situações parecidas, como na comunidade do Laços, ou com um profissional, costuma diminuir o peso de carregá-la em silêncio.',
    ],
    referencias: [MISQUIATTI],
  },
  {
    id: 'crise-em-publico',
    titulo: 'Quando a crise acontece no meio da rua',
    resumo: 'Os olhares, os palpites e o que fica em você depois que tudo passa.',
    categoria: 'Neurodivergência',
    capa: '/img/capa-floresta.jpg',
    capaAlt: 'Trilha de terra no meio de uma floresta de árvores altas',
    minutos: 4,
    psicologoId: 'rafael-moraes',
    publicadoEm: '2026-10-12',
    paragrafos: [
      'Uma crise em local público costuma mobilizar o cuidador de duas formas ao mesmo tempo: a atenção à pessoa que está em sofrimento e a exposição aos olhares e comentários de quem está em volta.',
      'Este texto não traz um passo a passo para lidar com crises — cada pessoa e cada família têm necessidades próprias, e orientações específicas devem vir da equipe que acompanha a pessoa cuidada. O foco aqui é você.',
      'Depois de uma situação assim, é comum sentir vergonha, raiva ou um esgotamento que dura o resto do dia. Dar nome a esses sentimentos e encontrar um lugar para falar deles ajuda a não acumulá-los.',
      'Se essas situações têm deixado marcas que você não consegue elaborar sozinho(a), a psicoterapia breve pode ser um espaço para olhar especificamente para isso.',
    ],
    referencias: [MISQUIATTI],
  },
  {
    id: 'pedir-ajuda',
    titulo: 'Pedir ajuda para a família sem precisar se justificar',
    resumo: 'Quando a rede de apoio existe no papel, mas não aparece no dia a dia.',
    categoria: 'Família',
    capa: '/img/capa-cha.jpg',
    capaAlt: 'Xícara de café com leite e dois biscoitos sobre um descanso de madeira',
    minutos: 3,
    psicologoId: 'ana-souza',
    publicadoEm: '2026-10-08',
    paragrafos: [
      'Muitos cuidadores contam que têm familiares por perto, mas que pedir ajuda parece exigir uma explicação longa, uma prova de que "precisa mesmo". Com o tempo, fica mais fácil não pedir.',
      'Pedidos concretos e pequenos costumam ser mais fáceis de atender do que pedidos amplos. "Você pode ficar com ele na quinta, das 14h às 16h?" diz mais do que "preciso de mais ajuda".',
      'Nem toda pessoa da família vai conseguir ajudar, e isso também é uma informação importante. Uma rede de apoio pode incluir amigos, vizinhos, serviços públicos e outros familiares atípicos.',
    ],
    referencias: [MISQUIATTI],
  },
  {
    id: 'o-que-e-psicoterapia-breve',
    titulo: 'O que é psicoterapia breve, e o que ela não é',
    resumo: 'Foco no presente, objetivos definidos e duração limitada. Entenda antes de agendar.',
    categoria: 'Psicoterapia',
    capa: '/img/capa-caderno.jpg',
    capaAlt: 'Mão segurando uma caneta sobre um caderno, ao lado de uma xícara',
    minutos: 3,
    psicologoId: 'beatriz-lemos',
    publicadoEm: '2026-10-02',
    paragrafos: [
      'A psicoterapia breve é uma modalidade de atendimento focada em uma demanda específica e atual, com objetivos combinados desde o início e duração limitada. Ela se adapta bem à rotina de quem tem pouco tempo e precisa de um espaço de escuta para algo que está pesando agora.',
      'No Laços, o atendimento é voltado ao familiar ou cuidador: às suas emoções, à sua sobrecarga, aos seus conflitos. Ele não é um espaço de orientação sobre o tratamento da pessoa cuidada.',
      'O número de sessões e os objetivos são combinados com o profissional no primeiro encontro, no contrato terapêutico, como prevê a Resolução CFP nº 13/2022. Quando a demanda ultrapassa os limites da modalidade, o psicólogo orienta e faz o encaminhamento adequado.',
    ],
    referencias: [HEGENBERG, NOVAIS],
  },
  {
    id: 'pequenas-pausas',
    titulo: 'Pausas que cabem num dia corrido',
    resumo: 'Não é sobre uma tarde de folga. É sobre o que dá para fazer entre uma coisa e outra.',
    categoria: 'Autocuidado',
    capa: '/img/capa-amanhecer.jpg',
    capaAlt: 'Sol nascendo sobre um campo com árvores e neblina',
    minutos: 2,
    psicologoId: 'rafael-moraes',
    publicadoEm: '2026-09-28',
    paragrafos: [
      'Conselhos de autocuidado muitas vezes pressupõem tempo livre que quem cuida não tem. Isso pode gerar ainda mais cobrança.',
      'Algumas pessoas encontram alívio em pausas curtas que já existem no dia: o café antes de todos acordarem, o caminho de volta da terapia, os minutos no carro antes de entrar em casa. Usar esses momentos para não fazer nada também é uma escolha válida.',
      'O que funciona é muito individual. Se nada parece caber na sua rotina, talvez seja a própria rotina que precise de ajuda — e isso vale uma conversa com sua rede ou com um profissional.',
    ],
    referencias: [MISQUIATTI],
  },
];

export const conteudoPorId = (id: string) => CONTEUDOS.find((c) => c.id === id);
