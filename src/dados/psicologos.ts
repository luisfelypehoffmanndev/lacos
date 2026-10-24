import type { Psicologo } from '../estado/tipos';

/**
 * Profissionais fictícios. Nomes, fotos e CRPs são de demonstração.
 * Ana Souza e seus horários seguem o exemplo do fichamento (item 13).
 * Sem notas, estrelas ou destaque: Nota Técnica CFP nº 01/2022.
 */
export const PSICOLOGOS: Psicologo[] = [
  {
    id: 'ana-souza',
    nome: 'Ana Souza',
    titulo: 'Psicóloga',
    crp: 'CRP 07/00001',
    foto: '/img/psi-ana-souza.jpg',
    formacao: 'Pós-graduada em Psicologia Social e Comunitária',
    valor: 120,
    minicurriculo:
      'Atende mães, pais e outros familiares que cuidam de pessoas neurodivergentes. Trabalha com demandas como sobrecarga, culpa e reorganização da rotina depois de um diagnóstico na família.',
    horarios: [
      { dia: 'Segunda-feira', horas: ['14h', '15h30', '17h'] },
      { dia: 'Quarta-feira', horas: ['9h', '19h'] },
      { dia: 'Sexta-feira', horas: ['11h'] },
    ],
  },
  {
    id: 'beatriz-lemos',
    nome: 'Beatriz Lemos',
    titulo: 'Psicóloga',
    crp: 'CRP 07/00002',
    foto: '/img/psi-beatriz-lemos.jpg',
    formacao: 'Especialista em Psicologia Clínica',
    valor: 150,
    minicurriculo:
      'Experiência com familiares de pessoas com depressão e transtorno bipolar. Atende demandas de ansiedade, esgotamento e conflitos familiares ligados ao cuidado.',
    horarios: [
      { dia: 'Terça-feira', horas: ['8h', '12h', '18h30'] },
      { dia: 'Quinta-feira', horas: ['10h', '20h'] },
    ],
  },
  {
    id: 'rafael-moraes',
    nome: 'Rafael Moraes',
    titulo: 'Psicólogo',
    crp: 'CRP 07/00003',
    foto: '/img/psi-rafael-moraes.jpg',
    formacao: 'Mestre em Psicologia',
    valor: 90,
    minicurriculo:
      'Atende pais e cônjuges cuidadores. Interesse em paternidade atípica, divisão do cuidado no casal e momentos de transição, como a entrada na escola ou na vida adulta.',
    horarios: [
      { dia: 'Segunda-feira', horas: ['19h', '20h30'] },
      { dia: 'Quarta-feira', horas: ['7h30'] },
      { dia: 'Sexta-feira', horas: ['18h'] },
    ],
  },
];

export const psicologoPorId = (id: string) => PSICOLOGOS.find((p) => p.id === id);

export const nomeCompleto = (p: Psicologo) => `${p.titulo} ${p.nome}`;

export const valorDaSessao = (p: Psicologo) => `R$ ${p.valor}`;
