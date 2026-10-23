import type { Relato } from '../estado/tipos';

const MIN = 60_000;

/**
 * Relatos fictícios da comunidade. Apelidos, sem fotos de rosto e sem nomes
 * de crianças (ECA; fichamento, item 15). As respostas trocam vivências,
 * nunca diagnósticos ou indicações de tratamento.
 */
export function relatosIniciais(agora: number): Relato[] {
  return [
    {
      id: 'r1',
      autor: { nome: 'Lu M.', papel: 'Mãe de criança com TEA e TDAH', cor: 'lilas' },
      texto:
        'Terceira reunião na escola este mês. Saí de lá com a sensação de que preciso provar o tempo todo que meu filho merece estar ali. Alguém mais vive isso?',
      criadaEm: agora - 52 * MIN,
      apoios: 18,
      apoiado: false,
      compartilhamentos: 2,
      deUsuario: false,
      denunciado: false,
      respostas: [
        {
          id: 'r1a',
          autor: { nome: 'Rô', papel: 'Mãe de adolescente com TEA', cor: 'laranja' },
          texto:
            'Vivo isso desde o primeiro ano. O que me ajudou foi ir acompanhada em algumas reuniões, nem que fosse só para ter alguém do meu lado.',
          criadaEm: agora - 40 * MIN,
        },
        {
          id: 'r1b',
          autor: { nome: 'Paulo', papel: 'Pai de criança com TOD e TEA', cor: 'azul' },
          texto: 'Esse cansaço de ter que justificar tudo é real. Você não está exagerando.',
          criadaEm: agora - 21 * MIN,
        },
      ],
    },
    {
      id: 'r2',
      autor: { nome: 'Paulo', papel: 'Pai de criança com TOD e TEA', cor: 'azul' },
      texto:
        'Aprendi a me afastar dois minutos antes de responder quando a crise começa. Não resolve tudo, mas eu volto mais calmo e a gente briga menos.',
      criadaEm: agora - 3 * 60 * MIN,
      apoios: 31,
      apoiado: false,
      compartilhamentos: 5,
      deUsuario: false,
      denunciado: false,
      respostas: [
        {
          id: 'r2a',
          autor: { nome: 'Lu M.', papel: 'Mãe de criança com TEA e TDAH', cor: 'lilas' },
          texto: 'Vou tentar. Eu sempre acho que sair é abandonar, mas talvez seja o contrário.',
          criadaEm: agora - 2 * 60 * MIN,
        },
      ],
    },
    {
      id: 'r3',
      autor: { nome: 'Cláudia', papel: 'Filha e cuidadora da mãe, que tem depressão', cor: 'ciano' },
      texto:
        'Cuidar de quem cuidou da gente tem um peso diferente. Tem dia que eu sinto raiva e logo depois culpa por ter sentido raiva. Escrevo aqui porque não consigo dizer isso em casa.',
      criadaEm: agora - 7 * 60 * MIN,
      apoios: 44,
      apoiado: false,
      compartilhamentos: 1,
      deUsuario: false,
      denunciado: false,
      respostas: [
        {
          id: 'r3a',
          autor: { nome: 'Sônia', papel: 'Esposa e cuidadora', cor: 'amarelo' },
          texto: 'Raiva e amor juntos, todo dia. Obrigada por escrever, me senti menos estranha.',
          criadaEm: agora - 6 * 60 * MIN,
        },
      ],
    },
    {
      id: 'r4',
      autor: { nome: 'Tati', papel: 'Irmã de jovem com deficiência intelectual', cor: 'amarelo' },
      texto:
        'Alguém já passou pela perícia do BPC por aqui? Queria saber como foi a experiência de vocês, o que levaram e quanto tempo esperaram.',
      criadaEm: agora - 26 * 60 * MIN,
      apoios: 9,
      apoiado: false,
      compartilhamentos: 3,
      deUsuario: false,
      denunciado: false,
      respostas: [
        {
          id: 'r4a',
          autor: { nome: 'Rô', papel: 'Mãe de adolescente com TEA', cor: 'laranja' },
          texto:
            'Levei todos os laudos e relatórios que tinha, organizados por data. Esperei uns quatro meses. O CRAS da minha cidade ajudou com o cadastro.',
          criadaEm: agora - 25 * 60 * MIN,
        },
      ],
    },
    {
      id: 'r5',
      autor: { nome: 'Sônia', papel: 'Esposa e cuidadora', cor: 'amarelo' },
      texto:
        'Hoje consegui almoçar sentada, sem pressa, pela primeira vez na semana. Parece pouco, mas para mim foi muito.',
      criadaEm: agora - 2 * 24 * 60 * MIN,
      apoios: 57,
      apoiado: false,
      compartilhamentos: 0,
      deUsuario: false,
      denunciado: false,
      respostas: [],
    },
  ];
}
