import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { relatosIniciais } from '../dados/relatos';
import type { DiaSemana, Genero, Mensagem, Relato, Solicitacao, Usuario } from './tipos';

export const LIMITE_RELATO = 500;

export interface DadosCadastro {
  nome: string;
  email: string;
  genero: Genero;
  foto: string | null;
}

export type ErrosCadastro = Partial<Record<'nome' | 'email', string>>;

export function validarCadastro({ nome, email }: { nome: string; email: string }): ErrosCadastro {
  const erros: ErrosCadastro = {};
  if (nome.trim().length < 2) erros.nome = 'Escreva como você quer ser chamado(a).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    erros.email = 'Confira o e-mail: ele precisa ter o formato nome@provedor.com.';
  }
  return erros;
}

export const papelDoUsuario = (genero: Genero) =>
  genero === 'Mulher' ? 'Familiar cuidadora' : genero === 'Homem' ? 'Familiar cuidador' : 'Familiar cuidador(a)';

const novoId = (prefixo: string) => `${prefixo}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const USUARIO_VAZIO: Usuario = { nome: '', email: '', genero: 'Prefiro não informar', foto: null, cadastrado: false, desde: 0 };

interface Dados {
  usuario: Usuario;
  relatos: Relato[];
  salvos: string[];
  solicitacoes: Solicitacao[];
  mensagens: Mensagem[];
}

interface Acoes {
  cadastrar: (dados: DadosCadastro) => ErrosCadastro;
  sair: () => void;
  publicar: (texto: string) => string | null;
  apoiar: (relatoId: string) => void;
  responder: (relatoId: string, texto: string) => boolean;
  compartilhar: (relatoId: string) => void;
  denunciar: (relatoId: string, motivo: string) => void;
  alternarSalvo: (conteudoId: string) => void;
  solicitarSessao: (psicologoId: string, dia: DiaSemana, hora: string) => 'ok' | 'duplicada';
  cancelarSolicitacao: (id: string) => void;
  enviarMensagem: (tipo: Mensagem['tipo'], texto: string, relatoId?: string) => boolean;
  reiniciar: () => void;
}

const dadosIniciais = (): Dados => ({
  usuario: USUARIO_VAZIO,
  relatos: relatosIniciais(Date.now()),
  salvos: [],
  solicitacoes: [],
  mensagens: [],
});

const nomeDeExibicao = (u: Usuario) => u.nome || 'Você';

export const useLoja = create<Dados & Acoes>()(
  persist(
    (set, get) => {
      const alterarRelato = (id: string, alterar: (r: Relato) => Relato) =>
        set((s) => ({ relatos: s.relatos.map((r) => (r.id === id ? alterar(r) : r)) }));

      return {
        ...dadosIniciais(),

        cadastrar: (dados) => {
          const erros = validarCadastro(dados);
          if (Object.keys(erros).length > 0) return erros;
          set((s) => ({
            usuario: {
              nome: dados.nome.trim(),
              email: dados.email.trim().toLowerCase(),
              genero: dados.genero,
              foto: dados.foto,
              cadastrado: true,
              desde: s.usuario.desde || Date.now(),
            },
          }));
          return {};
        },

        sair: () => set((s) => ({ usuario: { ...s.usuario, cadastrado: false } })),

        publicar: (texto) => {
          const limpo = texto.trim();
          if (!limpo || limpo.length > LIMITE_RELATO) return null;
          const { usuario } = get();
          const relato: Relato = {
            id: novoId('relato'),
            autor: { nome: nomeDeExibicao(usuario), papel: papelDoUsuario(usuario.genero), cor: 'azul' },
            texto: limpo,
            criadaEm: Date.now(),
            apoios: 0,
            apoiado: false,
            compartilhamentos: 0,
            respostas: [],
            deUsuario: true,
            denunciado: false,
          };
          set((s) => ({ relatos: [relato, ...s.relatos] }));
          return relato.id;
        },

        apoiar: (id) =>
          alterarRelato(id, (r) => ({ ...r, apoiado: !r.apoiado, apoios: r.apoios + (r.apoiado ? -1 : 1) })),

        responder: (id, texto) => {
          const limpo = texto.trim();
          if (!limpo || limpo.length > LIMITE_RELATO) return false;
          const { usuario } = get();
          alterarRelato(id, (r) => ({
            ...r,
            respostas: [
              ...r.respostas,
              {
                id: novoId('resposta'),
                autor: { nome: nomeDeExibicao(usuario), papel: papelDoUsuario(usuario.genero), cor: 'azul' },
                texto: limpo,
                criadaEm: Date.now(),
              },
            ],
          }));
          return true;
        },

        compartilhar: (id) => alterarRelato(id, (r) => ({ ...r, compartilhamentos: r.compartilhamentos + 1 })),

        denunciar: (id, motivo) => {
          alterarRelato(id, (r) => ({ ...r, denunciado: true }));
          get().enviarMensagem('denuncia', motivo, id);
        },

        alternarSalvo: (id) =>
          set((s) => ({ salvos: s.salvos.includes(id) ? s.salvos.filter((x) => x !== id) : [...s.salvos, id] })),

        solicitarSessao: (psicologoId, dia, hora) => {
          const repetida = get().solicitacoes.some((x) => x.psicologoId === psicologoId && x.dia === dia && x.hora === hora);
          if (repetida) return 'duplicada';
          const nova: Solicitacao = { id: novoId('sessao'), psicologoId, dia, hora, criadaEm: Date.now() };
          set((s) => ({ solicitacoes: [nova, ...s.solicitacoes] }));
          return 'ok';
        },

        cancelarSolicitacao: (id) => set((s) => ({ solicitacoes: s.solicitacoes.filter((x) => x.id !== id) })),

        enviarMensagem: (tipo, texto, relatoId) => {
          const limpo = texto.trim();
          if (!limpo) return false;
          const msg: Mensagem = { id: novoId('msg'), tipo, texto: limpo, criadaEm: Date.now(), relatoId };
          set((s) => ({ mensagens: [msg, ...s.mensagens] }));
          return true;
        },

        reiniciar: () => set(dadosIniciais()),
      };
    },
    {
      name: 'lacos-demo-v2',
      partialize: ({ usuario, relatos, salvos, solicitacoes, mensagens }) => ({ usuario, relatos, salvos, solicitacoes, mensagens }),
    },
  ),
);
