import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/lexend';
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import './estilos/app.css';
import { Palco } from './palco/Palco';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Palco />
  </StrictMode>,
);
