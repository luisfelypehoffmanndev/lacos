import { describe, it, expect } from 'vitest';
import { PSICOLOGOS } from './psicologos';

describe('valor por profissional', () => {
  it('cada profissional tem um valor fixo dentro da faixa social de R$ 80 a R$ 180', () => {
    for (const p of PSICOLOGOS) {
      expect(Number.isInteger(p.valor)).toBe(true);
      expect(p.valor).toBeGreaterThanOrEqual(80);
      expect(p.valor).toBeLessThanOrEqual(180);
    }
  });

  it('os valores são diferentes entre si', () => {
    const valores = PSICOLOGOS.map((p) => p.valor);
    expect(new Set(valores).size).toBe(valores.length);
  });
});
