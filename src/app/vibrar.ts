export const MOVIMENTO_REDUZIDO = '(prefers-reduced-motion: reduce)';

/** true quando a pessoa pediu menos movimento no aparelho. */
export const movimentoReduzido = () => typeof matchMedia === 'function' && matchMedia(MOVIMENTO_REDUZIDO).matches;

/**
 * Vibração curtinha para confirmar ações importantes. Só existe no Android;
 * no iPhone e no computador não faz nada. Respeita quem pediu menos movimento.
 */
export function vibrar(ms = 12) {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
  if (movimentoReduzido()) return;
  navigator.vibrate(ms);
}
