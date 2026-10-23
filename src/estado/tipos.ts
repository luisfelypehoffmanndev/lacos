export type Genero = 'Mulher' | 'Homem' | 'Não binário' | 'Prefiro não informar';

export const GENEROS: Genero[] = ['Mulher', 'Homem', 'Não binário', 'Prefiro não informar'];

/** Cores da fita do logo, usadas nas iniciais de quem participa da comunidade. */
export type CorFita = 'azul' | 'ciano' | 'lilas' | 'laranja' | 'amarelo';

export interface Usuario {
  nome: string;
  email: string;
  genero: Genero;
  /** Foto enviada do aparelho (data URL) ou null para usar a inicial. */
  foto: string | null;
  cadastrado: boolean;
  desde: number;
}

export interface Autor {
  nome: string;
  /** Papel de cuidado, escrito pela própria pessoa. Ex.: "Mãe de criança com TEA". */
  papel: string;
  cor: CorFita;
}

export interface Resposta {
  id: string;
  autor: Autor;
  texto: string;
  criadaEm: number;
}

export interface Relato {
  id: string;
  autor: Autor;
  texto: string;
  criadaEm: number;
  apoios: number;
  apoiado: boolean;
  compartilhamentos: number;
  respostas: Resposta[];
  deUsuario: boolean;
  /** Denunciado por quem está usando: some do feed e vai para a moderação. */
  denunciado: boolean;
}

export type Categoria = 'Autocuidado' | 'Emoções' | 'Neurodivergência' | 'Família' | 'Psicoterapia';

export const CATEGORIAS: Categoria[] = ['Autocuidado', 'Emoções', 'Neurodivergência', 'Família', 'Psicoterapia'];

export interface Conteudo {
  id: string;
  titulo: string;
  resumo: string;
  categoria: Categoria;
  capa: string;
  capaAlt: string;
  minutos: number;
  psicologoId: string;
  /** Data de publicação, AAAA-MM-DD. */
  publicadoEm: string;
  paragrafos: string[];
  referencias: string[];
}

export type DiaSemana = 'Segunda-feira' | 'Terça-feira' | 'Quarta-feira' | 'Quinta-feira' | 'Sexta-feira';

export interface Psicologo {
  id: string;
  nome: string;
  titulo: 'Psicóloga' | 'Psicólogo';
  crp: string;
  foto: string;
  formacao: string;
  minicurriculo: string;
  horarios: { dia: DiaSemana; horas: string[] }[];
}

export interface Solicitacao {
  id: string;
  psicologoId: string;
  dia: DiaSemana;
  hora: string;
  criadaEm: number;
}

export interface Mensagem {
  id: string;
  tipo: 'sugestao' | 'denuncia';
  texto: string;
  criadaEm: number;
  relatoId?: string;
}
