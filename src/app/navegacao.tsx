import { createContext, useContext } from 'react';

export type Rota =
  | { tela: 'boas-vindas' }
  | { tela: 'cadastro'; modo?: 'entrar' | 'editar' }
  | { tela: 'inicio' }
  | { tela: 'comunidade' }
  | { tela: 'relato'; id: string }
  | { tela: 'conteudos' }
  | { tela: 'conteudo'; id: string }
  | { tela: 'psicoterapia' }
  | { tela: 'psicologo'; id: string }
  /** `abrir` é interno (não vai para o link): abre uma seção do perfil ao chegar. */
  | { tela: 'perfil'; abrir?: 'sessoes' };

export type Aba = 'inicio' | 'comunidade' | 'conteudos' | 'psicoterapia' | 'perfil';

export type AcaoPilha = { tipo: 'ir'; rota: Rota } | { tipo: 'voltar' } | { tipo: 'recomecar'; rota: Rota };

export function reduzirPilha(pilha: Rota[], acao: AcaoPilha): Rota[] {
  switch (acao.tipo) {
    case 'ir':
      return [...pilha, acao.rota];
    case 'voltar':
      return pilha.length > 1 ? pilha.slice(0, -1) : pilha;
    case 'recomecar':
      return [acao.rota];
  }
}

export function abaDaRota(rota: Rota): Aba | null {
  switch (rota.tela) {
    case 'boas-vindas':
    case 'cadastro':
      return null;
    case 'relato':
      return 'comunidade';
    case 'conteudo':
      return 'conteudos';
    case 'psicologo':
      return 'psicoterapia';
    default:
      return rota.tela;
  }
}

/** Telas de detalhe com barra de ação própria escondem as abas (como na ref. 07). */
export const mostraAbas = (rota: Rota) =>
  abaDaRota(rota) !== null && rota.tela !== 'conteudo' && rota.tela !== 'psicologo';

/** Telas com topo azul pedem a barra de status com texto branco. */
export const topoEscuro = (rota: Rota) =>
  rota.tela === 'boas-vindas' || rota.tela === 'cadastro' || rota.tela === 'psicoterapia' || rota.tela === 'perfil';

export function rotaParaHash(rota: Rota): string {
  if ('id' in rota) return `#/${rota.tela}/${encodeURIComponent(rota.id)}`;
  if (rota.tela === 'cadastro' && rota.modo) return `#/cadastro/${rota.modo}`;
  return `#/${rota.tela}`;
}

const SIMPLES = ['boas-vindas', 'inicio', 'comunidade', 'conteudos', 'psicoterapia', 'perfil'] as const;
const COM_ID = ['relato', 'conteudo', 'psicologo'] as const;

export function hashParaRota(hash: string): Rota | null {
  const [tela, param] = hash.replace(/^#\/?/, '').split('/');
  if ((SIMPLES as readonly string[]).includes(tela) && !param) return { tela } as Rota;
  if ((COM_ID as readonly string[]).includes(tela) && param) return { tela, id: decodeURIComponent(param) } as Rota;
  if (tela === 'cadastro') {
    if (!param) return { tela: 'cadastro' };
    if (param === 'entrar' || param === 'editar') return { tela: 'cadastro', modo: param };
  }
  return null;
}

export interface Navegacao {
  rota: Rota;
  podeVoltar: boolean;
  ir: (rota: Rota) => void;
  voltar: () => void;
  recomecar: (rota: Rota) => void;
  /** Mensagem curta no rodapé da tela ("Relato publicado."). */
  avisar: (texto: string) => void;
  /** Elemento onde folhas e avisos são desenhados, para não escaparem da moldura do celular. */
  camada: HTMLElement | null;
}

export const NavegacaoContexto = createContext<Navegacao | null>(null);

export function useNavegacao(): Navegacao {
  const nav = useContext(NavegacaoContexto);
  if (!nav) throw new Error('useNavegacao precisa estar dentro de <LacosApp>.');
  return nav;
}
