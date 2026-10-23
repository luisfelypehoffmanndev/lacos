import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { useLoja } from '../estado/loja';

afterEach(() => {
  cleanup();
  localStorage.clear();
  useLoja.getState().reiniciar();
});
