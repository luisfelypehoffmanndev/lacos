const MIN = 60_000;
const HORA = 60 * MIN;
const DIA = 24 * HORA;

export function tempoRelativo(momento: number, agora = Date.now()): string {
  const passado = Math.max(0, agora - momento);
  if (passado < MIN) return 'agora';
  if (passado < HORA) return `há ${Math.floor(passado / MIN)} min`;
  if (passado < DIA) return `há ${Math.floor(passado / HORA)} h`;
  const dias = Math.floor(passado / DIA);
  return dias === 1 ? 'ontem' : `há ${dias} dias`;
}

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/** "2026-10-20" → "20 de outubro de 2026". */
export function dataPorExtenso(iso: string): string {
  const [ano, mes, dia] = iso.split('-').map(Number);
  return `${dia} de ${MESES[mes - 1]} de ${ano}`;
}

export function mesEAno(momento: number): string {
  const d = new Date(momento);
  return `${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}
