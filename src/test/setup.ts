import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup, configure } from '@testing-library/react';
import { useLoja } from '../estado/loja';

// Conteúdo inerte (ex.: a folha descendo ao fechar) não é percebido nem tocável: as buscas o ignoram.
configure({ defaultIgnore: 'script, style, [inert], [inert] *' });

afterEach(() => {
  cleanup();
  localStorage.clear();
  useLoja.getState().reiniciar();
});
