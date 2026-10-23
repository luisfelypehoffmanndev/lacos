import { describe, it, expect, vi, afterEach } from 'vitest';
import { vibrar } from './vibrar';

const definirVibrate = (valor: unknown) =>
  Object.defineProperty(navigator, 'vibrate', { value: valor, configurable: true, writable: true });

afterEach(() => {
  vi.unstubAllGlobals();
  definirVibrate(undefined);
});

describe('vibrar', () => {
  it('vibra 12 ms por padrão', () => {
    const vibrate = vi.fn();
    definirVibrate(vibrate);
    vibrar();
    expect(vibrate).toHaveBeenCalledWith(12);
  });

  it('não vibra quando a pessoa pediu menos movimento', () => {
    const vibrate = vi.fn();
    definirVibrate(vibrate);
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('reduce') }));
    vibrar();
    expect(vibrate).not.toHaveBeenCalled();
  });

  it('não quebra onde não há vibração (iPhone, computador)', () => {
    definirVibrate(undefined);
    expect(() => vibrar()).not.toThrow();
  });
});
