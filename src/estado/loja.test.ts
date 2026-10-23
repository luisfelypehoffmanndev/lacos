import { describe, it, expect, beforeEach } from 'vitest';
import { useLoja, validarCadastro, LIMITE_RELATO } from './loja';

const loja = () => useLoja.getState();

beforeEach(() => {
  loja().reiniciar();
});

describe('validarCadastro', () => {
  it('aceita nome e e-mail válidos', () => {
    expect(validarCadastro({ nome: 'Marina', email: 'marina@exemplo.com' })).toEqual({});
  });

  it('pede um nome com pelo menos 2 letras', () => {
    expect(validarCadastro({ nome: ' a ', email: 'marina@exemplo.com' }).nome).toBe(
      'Escreva como você quer ser chamado(a).',
    );
  });

  it('recusa e-mail sem @ ou domínio', () => {
    expect(validarCadastro({ nome: 'Marina', email: 'marina' }).email).toBe(
      'Confira o e-mail: ele precisa ter o formato nome@provedor.com.',
    );
    expect(validarCadastro({ nome: 'Marina', email: '' }).email).toBeDefined();
  });
});

describe('cadastro', () => {
  it('começa sem cadastro', () => {
    expect(loja().usuario.cadastrado).toBe(false);
  });

  it('cadastra com dados limpos e registra a data de entrada', () => {
    const erros = loja().cadastrar({ nome: '  Marina  ', email: ' Marina@Exemplo.com ', genero: 'Mulher', foto: null });
    expect(erros).toEqual({});
    const u = loja().usuario;
    expect(u).toMatchObject({ nome: 'Marina', email: 'marina@exemplo.com', genero: 'Mulher', cadastrado: true });
    expect(u.desde).toBeGreaterThan(0);
  });

  it('não cadastra com dados inválidos', () => {
    const erros = loja().cadastrar({ nome: '', email: 'x', genero: 'Mulher', foto: null });
    expect(Object.keys(erros)).toEqual(['nome', 'email']);
    expect(loja().usuario.cadastrado).toBe(false);
  });

  it('sair desfaz o cadastro', () => {
    loja().cadastrar({ nome: 'Marina', email: 'm@e.com', genero: 'Mulher', foto: null });
    loja().sair();
    expect(loja().usuario.cadastrado).toBe(false);
  });
});

describe('comunidade', () => {
  it('traz relatos de exemplo, todos de outras pessoas', () => {
    expect(loja().relatos.length).toBeGreaterThanOrEqual(4);
    expect(loja().relatos.every((r) => !r.deUsuario)).toBe(true);
  });

  it('publica um relato no topo, com o nome de quem está usando', () => {
    loja().cadastrar({ nome: 'Marina', email: 'm@e.com', genero: 'Mulher', foto: null });
    const id = loja().publicar('  Hoje foi difícil.  ');
    const [primeiro] = loja().relatos;
    expect(primeiro.id).toBe(id);
    expect(primeiro).toMatchObject({ texto: 'Hoje foi difícil.', deUsuario: true, apoios: 0 });
    expect(primeiro.autor.nome).toBe('Marina');
  });

  it('não publica texto vazio nem acima do limite', () => {
    const antes = loja().relatos.length;
    expect(loja().publicar('   ')).toBeNull();
    expect(loja().publicar('a'.repeat(LIMITE_RELATO + 1))).toBeNull();
    expect(loja().relatos.length).toBe(antes);
  });

  it('apoiar soma e desfaz', () => {
    const r = loja().relatos[0];
    loja().apoiar(r.id);
    expect(loja().relatos[0]).toMatchObject({ apoiado: true, apoios: r.apoios + 1 });
    loja().apoiar(r.id);
    expect(loja().relatos[0]).toMatchObject({ apoiado: false, apoios: r.apoios });
  });

  it('responder adiciona ao fim da conversa', () => {
    const r = loja().relatos[0];
    expect(loja().responder(r.id, ' Estou com você. ')).toBe(true);
    const respostas = loja().relatos[0].respostas;
    expect(respostas[respostas.length - 1].texto).toBe('Estou com você.');
    expect(loja().responder(r.id, '  ')).toBe(false);
  });

  it('denunciar esconde o relato e registra a denúncia para a moderação', () => {
    const r = loja().relatos[1];
    loja().denunciar(r.id, 'Expõe uma criança');
    expect(loja().relatos.find((x) => x.id === r.id)?.denunciado).toBe(true);
    expect(loja().mensagens[0]).toMatchObject({ tipo: 'denuncia', relatoId: r.id, texto: 'Expõe uma criança' });
  });

  it('compartilhar conta uma vez', () => {
    const r = loja().relatos[0];
    loja().compartilhar(r.id);
    expect(loja().relatos[0].compartilhamentos).toBe(r.compartilhamentos + 1);
  });
});

describe('conteúdos salvos', () => {
  it('salva e remove', () => {
    loja().alternarSalvo('cansaco-de-quem-cuida');
    expect(loja().salvos).toEqual(['cansaco-de-quem-cuida']);
    loja().alternarSalvo('cansaco-de-quem-cuida');
    expect(loja().salvos).toEqual([]);
  });
});

describe('psicoterapia breve', () => {
  it('solicita uma sessão', () => {
    expect(loja().solicitarSessao('ana-souza', 'Segunda-feira', '15h30')).toBe('ok');
    expect(loja().solicitacoes[0]).toMatchObject({ psicologoId: 'ana-souza', dia: 'Segunda-feira', hora: '15h30' });
  });

  it('não duplica o mesmo horário', () => {
    loja().solicitarSessao('ana-souza', 'Segunda-feira', '15h30');
    expect(loja().solicitarSessao('ana-souza', 'Segunda-feira', '15h30')).toBe('duplicada');
    expect(loja().solicitacoes).toHaveLength(1);
  });

  it('cancela uma solicitação', () => {
    loja().solicitarSessao('ana-souza', 'Quarta-feira', '9h');
    loja().cancelarSolicitacao(loja().solicitacoes[0].id);
    expect(loja().solicitacoes).toHaveLength(0);
  });
});

describe('sugestões e denúncias', () => {
  it('registra mensagem com texto', () => {
    expect(loja().enviarMensagem('sugestao', 'Um modo noturno ajudaria.')).toBe(true);
    expect(loja().mensagens[0]).toMatchObject({ tipo: 'sugestao', texto: 'Um modo noturno ajudaria.' });
  });

  it('recusa mensagem vazia', () => {
    expect(loja().enviarMensagem('denuncia', ' ')).toBe(false);
    expect(loja().mensagens).toHaveLength(0);
  });
});

describe('reiniciar', () => {
  it('volta tudo ao estado da demonstração', () => {
    loja().cadastrar({ nome: 'Marina', email: 'm@e.com', genero: 'Mulher', foto: null });
    loja().publicar('Teste');
    loja().solicitarSessao('ana-souza', 'Sexta-feira', '11h');
    loja().alternarSalvo('x');
    loja().reiniciar();
    expect(loja().usuario.cadastrado).toBe(false);
    expect(loja().relatos.some((r) => r.deUsuario)).toBe(false);
    expect(loja().solicitacoes).toEqual([]);
    expect(loja().salvos).toEqual([]);
  });
});
