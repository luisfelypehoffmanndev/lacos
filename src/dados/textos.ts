/** Mensagens do dia no Início: sinceras, sem cobrança e sem positividade forçada. */
export const MENSAGENS_DO_DIA = [
  'Hoje você pode fazer só o que for possível.',
  'Cansaço não é falta de amor.',
  'Pedir ajuda também é cuidar.',
  'Nem todo dia precisa ter sido um bom dia.',
  'O que você sente importa, mesmo quando não sobra tempo para sentir.',
  'Você não precisa dar conta de tudo sozinho(a).',
  'Descansar não é abandonar ninguém.',
];

export const mensagemDoDia = (data = new Date()) => {
  const inicioDoAno = new Date(data.getFullYear(), 0, 0).getTime();
  const dia = Math.floor((data.getTime() - inicioDoAno) / 86_400_000);
  return MENSAGENS_DO_DIA[dia % MENSAGENS_DO_DIA.length];
};

/** Fichamento, item 15. */
export const REGRAS_DE_CONVIVENCIA = [
  'Respeite todas as pessoas e suas experiências.',
  'Fale com educação e acolhimento.',
  'Não compartilhe informações pessoais de outras pessoas.',
  'Evite julgamentos, preconceitos e ofensas.',
  'Não ofereça nem divulgue diagnósticos ou tratamentos.',
  'Não publique fotos, nomes, documentos ou a localização de crianças e de terceiros.',
];

export const MOTIVOS_DE_DENUNCIA = [
  'Expõe uma criança ou outra pessoa',
  'Ofensa, preconceito ou ameaça',
  'Indica diagnóstico ou tratamento',
  'Spam ou propaganda',
  'Outro motivo',
];
