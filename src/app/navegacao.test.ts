import { describe, it, expect } from 'vitest';
import { abaDaRota, hashParaRota, rotaParaHash, reduzirPilha, type Rota } from './navegacao';

describe('links por tela', () => {
  const rotas: Rota[] = [
    { tela: 'boas-vindas' },
    { tela: 'cadastro' },
    { tela: 'cadastro', modo: 'entrar' },
    { tela: 'inicio' },
    { tela: 'comunidade' },
    { tela: 'relato', id: 'r1' },
    { tela: 'conteudos' },
    { tela: 'conteudo', id: 'culpa' },
    { tela: 'psicoterapia' },
    { tela: 'psicologo', id: 'ana-souza' },
    { tela: 'perfil' },
  ];

  it.each(rotas)('ida e volta de %o', (rota) => {
    expect(hashParaRota(rotaParaHash(rota))).toEqual(rota);
  });

  it('ignora hash desconhecido', () => {
    expect(hashParaRota('#/nada')).toBeNull();
    expect(hashParaRota('')).toBeNull();
    expect(hashParaRota('#/relato')).toBeNull();
  });
});

describe('aba ativa', () => {
  it('telas internas acendem a aba do seu pilar', () => {
    expect(abaDaRota({ tela: 'relato', id: 'r1' })).toBe('comunidade');
    expect(abaDaRota({ tela: 'conteudo', id: 'x' })).toBe('conteudos');
    expect(abaDaRota({ tela: 'psicologo', id: 'x' })).toBe('psicoterapia');
    expect(abaDaRota({ tela: 'perfil' })).toBe('perfil');
  });

  it('boas-vindas e cadastro não têm barra de abas', () => {
    expect(abaDaRota({ tela: 'boas-vindas' })).toBeNull();
    expect(abaDaRota({ tela: 'cadastro' })).toBeNull();
  });
});

describe('pilha de navegação', () => {
  const inicio: Rota = { tela: 'inicio' };
  const comunidade: Rota = { tela: 'comunidade' };
  const relato: Rota = { tela: 'relato', id: 'r1' };

  it('ir empilha, voltar desempilha', () => {
    let p = reduzirPilha([inicio], { tipo: 'ir', rota: comunidade });
    p = reduzirPilha(p, { tipo: 'ir', rota: relato });
    expect(p).toEqual([inicio, comunidade, relato]);
    expect(reduzirPilha(p, { tipo: 'voltar' })).toEqual([inicio, comunidade]);
  });

  it('voltar na raiz não esvazia a pilha', () => {
    expect(reduzirPilha([inicio], { tipo: 'voltar' })).toEqual([inicio]);
  });

  it('trocar de aba recomeça a pilha', () => {
    expect(reduzirPilha([inicio, comunidade, relato], { tipo: 'recomecar', rota: comunidade })).toEqual([comunidade]);
  });
});
