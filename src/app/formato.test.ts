import { describe, it, expect } from 'vitest';
import { dataPorExtenso, mesEAno, tempoRelativo } from './formato';

const agora = new Date('2026-10-23T15:00:00').getTime();
const MIN = 60_000;

describe('tempoRelativo', () => {
  it.each([
    [0, 'agora'],
    [30_000, 'agora'],
    [5 * MIN, 'há 5 min'],
    [59 * MIN, 'há 59 min'],
    [60 * MIN, 'há 1 h'],
    [23 * 60 * MIN, 'há 23 h'],
    [24 * 60 * MIN, 'ontem'],
    [3 * 24 * 60 * MIN, 'há 3 dias'],
  ])('%i ms atrás vira "%s"', (diferenca, esperado) => {
    expect(tempoRelativo(agora - diferenca, agora)).toBe(esperado);
  });
});

describe('datas por extenso', () => {
  it('formata a data de publicação', () => {
    expect(dataPorExtenso('2026-10-20')).toBe('20 de outubro de 2026');
  });

  it('formata mês e ano de entrada', () => {
    expect(mesEAno(agora)).toBe('outubro de 2026');
  });
});
