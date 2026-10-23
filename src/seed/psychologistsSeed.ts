import { Psychologist } from '../store/types';

export const INITIAL_PSYCHOLOGISTS: Psychologist[] = [
  {
    id: 'psy-1',
    name: 'Dra. Karen de Castro Kotlewski',
    crp: 'CRP 07/34912 (Ativo)',
    approach: 'Terapia Cognitivo-Comportamental (TCC) & Fenomenologia',
    specialty: 'Sobrecarga de Cuidadores e Parentalidade Atípica',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    bio: 'Mais de 8 anos de experiência no acompanhamento clínico de mães e pais atípicos. Foco em redução da ansiedade, manejo do estresse parental crônico e reconstrução de autocuidado.',
    socialPriceRange: 'R$ 90,00 a R$ 130,00 (Valor Social)',
    slots: [
      { id: 'slot-1-1', dateStr: '24/10', dayOfWeek: 'Amanhã', time: '14:30' },
      { id: 'slot-1-2', dateStr: '24/10', dayOfWeek: 'Amanhã', time: '16:00' },
      { id: 'slot-1-3', dateStr: '27/10', dayOfWeek: 'Segunda-feira', time: '10:00' },
      { id: 'slot-1-4', dateStr: '27/10', dayOfWeek: 'Segunda-feira', time: '15:00' },
    ]
  },
  {
    id: 'psy-2',
    name: 'Lucas Daniel Jung',
    crp: 'CRP 07/31045 (Ativo)',
    approach: 'Psicologia Social & Psicoterapia Breve Focada',
    specialty: 'Acolhimento Familiar, Luto do Diagnóstico e Relações de Suporte',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    bio: 'Especialista em intervenções breves focadas em crises familiares. Atuação humanizada voltada a desatar nós relacionais e acolher o impacto inicial de laudos neurodivergentes.',
    socialPriceRange: 'R$ 80,00 a R$ 120,00 (Valor Social)',
    slots: [
      { id: 'slot-2-1', dateStr: '24/10', dayOfWeek: 'Amanhã', time: '09:00' },
      { id: 'slot-2-2', dateStr: '25/10', dayOfWeek: 'Sábado', time: '11:00' },
      { id: 'slot-2-3', dateStr: '28/10', dayOfWeek: 'Terça-feira', time: '18:30' },
    ]
  },
  {
    id: 'psy-3',
    name: 'Joiciele Nascimento de Oliveira',
    crp: 'CRP 07/28901 (Ativo)',
    approach: 'Abordagem Centrada na Pessoa (Humanista)',
    specialty: 'Escuta Ativa para Mulheres Cuidadores e Esgotamento Emocional',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    bio: 'Pesquisadora em saúde mental da mulher cuidadora na FASA. Espaço de fala seguro, sem cobranças de desempenho ou perfeição materna.',
    socialPriceRange: 'R$ 100,00 a R$ 150,00 (Valor Social)',
    slots: [
      { id: 'slot-3-1', dateStr: '25/10', dayOfWeek: 'Sábado', time: '14:00' },
      { id: 'slot-3-2', dateStr: '27/10', dayOfWeek: 'Segunda-feira', time: '19:00' },
      { id: 'slot-3-3', dateStr: '29/10', dayOfWeek: 'Quarta-feira', time: '17:00' },
    ]
  },
  {
    id: 'psy-4',
    name: 'Natalia Santiago',
    crp: 'CRP 07/39211 (Ativo)',
    approach: 'Terapia de Aceitação e Compromisso (ACT)',
    specialty: 'Flexibilidade Psicológica, Ansiedade e Famílias com TEA/TDAH',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256',
    bio: 'Atendimento direcionado a desenvolver estratégias pragmáticas de enfrentamento do estresse diário, valorizando os valores essenciais de cada família.',
    socialPriceRange: 'R$ 90,00 a R$ 140,00 (Valor Social)',
    slots: [
      { id: 'slot-4-1', dateStr: '24/10', dayOfWeek: 'Amanhã', time: '17:30' },
      { id: 'slot-4-2', dateStr: '28/10', dayOfWeek: 'Terça-feira', time: '14:00' },
      { id: 'slot-4-3', dateStr: '30/10', dayOfWeek: 'Quinta-feira', time: '10:30' },
    ]
  }
];
