import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LacosApp } from './LacosApp';
import { useLoja } from '../estado/loja';
import { AVISO_ETICO } from '../dados/conteudos';
import type { Rota } from './navegacao';

const cadastrar = () =>
  useLoja.getState().cadastrar({ nome: 'Marina', email: 'marina@exemplo.com', genero: 'Mulher', foto: null });

const abrir = (rota: Rota) => {
  const user = userEvent.setup();
  render(<LacosApp rotaInicial={rota} />);
  return user;
};

const titulo = (nome: string | RegExp) => screen.getByRole('heading', { level: 1, name: nome });

describe('boas-vindas e cadastro', () => {
  it('leva do começo ao Início com nome e e-mail', async () => {
    const user = abrir({ tela: 'boas-vindas' });
    expect(titulo(/conectando histórias/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Criar meu cadastro' }));
    expect(titulo('Criar cadastro')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Entrar no Laços' }));
    expect(screen.getByText('Escreva como você quer ser chamado(a).')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Como quer ser chamado(a)?'), 'Marina');
    await user.type(screen.getByLabelText('E-mail'), 'marina@exemplo.com');
    await user.click(screen.getByRole('radio', { name: 'Mulher' }));
    await user.click(screen.getByRole('button', { name: 'Entrar no Laços' }));

    expect(titulo('Olá, Marina.')).toBeInTheDocument();
  });

  it('quem já tem cadastro vai direto ao Início', async () => {
    cadastrar();
    const user = abrir({ tela: 'boas-vindas' });
    await user.click(screen.getByRole('button', { name: 'Já tenho cadastro' }));
    expect(titulo('Olá, Marina.')).toBeInTheDocument();
  });
});

describe('Início', () => {
  beforeEach(cadastrar);

  it('abre os três pilares', async () => {
    const user = abrir({ tela: 'inicio' });
    await user.click(screen.getByRole('button', { name: /^Comunidade/ }));
    expect(titulo('Comunidade')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Início' }));
    await user.click(screen.getByRole('button', { name: /^Conteúdos/ }));
    expect(titulo('Conteúdos')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Início' }));
    await user.click(screen.getByRole('button', { name: /Agende uma sessão de psicoterapia breve/ }));
    expect(titulo('Psicoterapia breve')).toBeInTheDocument();
  });

  it('mostra os telefones de apoio em crise', () => {
    abrir({ tela: 'inicio' });
    expect(screen.getByRole('link', { name: /188/ })).toHaveAttribute('href', 'tel:188');
    expect(screen.getByRole('link', { name: /192/ })).toHaveAttribute('href', 'tel:192');
  });

  it('envia uma sugestão', async () => {
    const user = abrir({ tela: 'inicio' });
    await user.click(screen.getByRole('button', { name: /Sugestões e denúncias/ }));
    const folha = screen.getByRole('dialog', { name: 'Sugestões e denúncias' });
    await user.type(within(folha).getByLabelText('Sua mensagem'), 'Um modo noturno ajudaria.');
    await user.click(within(folha).getByRole('button', { name: 'Enviar' }));
    expect(within(folha).getByText('Mensagem enviada.')).toBeInTheDocument();
    expect(useLoja.getState().mensagens[0].texto).toBe('Um modo noturno ajudaria.');
  });
});

describe('Comunidade', () => {
  beforeEach(cadastrar);

  it('publica um relato só depois da confirmação de proteção', async () => {
    const user = abrir({ tela: 'comunidade' });
    await user.click(screen.getByRole('button', { name: 'Novo relato' }));
    const folha = screen.getByRole('dialog', { name: 'Novo relato' });
    await user.type(within(folha).getByLabelText('Seu relato'), 'Primeira vez escrevendo aqui.');

    const publicar = within(folha).getByRole('button', { name: 'Publicar relato' });
    expect(publicar).toBeDisabled();
    await user.click(within(folha).getByRole('checkbox'));
    expect(publicar).toBeEnabled();
    await user.click(publicar);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Primeira vez escrevendo aqui.')).toBeInTheDocument();
  });

  it('denunciar esconde o relato', async () => {
    const user = abrir({ tela: 'comunidade' });
    const texto = useLoja.getState().relatos[0].texto;
    await user.click(screen.getAllByRole('button', { name: 'Mais opções' })[0]);
    const folha = screen.getByRole('dialog', { name: 'Denunciar relato' });
    await user.click(within(folha).getByRole('radio', { name: 'Expõe uma criança ou outra pessoa' }));
    await user.click(within(folha).getByRole('button', { name: 'Enviar denúncia' }));
    expect(screen.queryByText(texto)).not.toBeInTheDocument();
    expect(screen.getByText(/Você denunciou este relato/)).toBeInTheDocument();
  });

  it('abre a conversa e responde', async () => {
    const user = abrir({ tela: 'comunidade' });
    const relato = useLoja.getState().relatos[0];
    await user.click(screen.getByText(relato.texto));
    expect(titulo('Relato')).toBeInTheDocument();
    expect(screen.getByText(relato.respostas[0].texto)).toBeInTheDocument();

    await user.type(screen.getByLabelText('Sua resposta'), 'Estou com você.');
    await user.click(screen.getByRole('button', { name: 'Enviar resposta' }));
    expect(screen.getByText('Estou com você.')).toBeInTheDocument();
  });

  it('apoiar marca o botão', async () => {
    const user = abrir({ tela: 'comunidade' });
    const [apoio] = screen.getAllByRole('button', { name: /^Apoiar/ });
    expect(apoio).toHaveAttribute('aria-pressed', 'false');
    await user.click(apoio);
    expect(apoio).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('Conteúdos', () => {
  beforeEach(cadastrar);

  it('filtra por categoria e mostra autoria, CRP e aviso ético', async () => {
    const user = abrir({ tela: 'conteudos' });
    await user.click(screen.getByRole('radio', { name: 'Psicoterapia' }));
    const cards = screen.getAllByRole('button', { name: /min de leitura/ });
    expect(cards).toHaveLength(1);

    await user.click(cards[0]);
    expect(titulo('O que é psicoterapia breve, e o que ela não é')).toBeInTheDocument();
    expect(screen.getByText(/CRP 07\/00002/)).toBeInTheDocument();
    expect(screen.getByText(AVISO_ETICO)).toBeInTheDocument();

    const salvar = screen.getByRole('button', { name: 'Salvar conteúdo' });
    await user.click(salvar);
    expect(salvar).toHaveAttribute('aria-pressed', 'true');
    expect(useLoja.getState().salvos).toEqual(['o-que-e-psicoterapia-breve']);
  });
});

describe('Psicoterapia breve', () => {
  beforeEach(cadastrar);

  it('solicita uma sessão com aceite e acompanha no perfil', async () => {
    const user = abrir({ tela: 'psicoterapia' });
    expect(screen.getByText(/R\$ 80 a R\$ 180/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Psicóloga Ana Souza/ }));
    expect(titulo('Psicóloga Ana Souza')).toBeInTheDocument();
    expect(screen.getByText('CRP 07/00001')).toBeInTheDocument();

    const solicitar = screen.getByRole('button', { name: 'Solicitar sessão' });
    expect(solicitar).toBeDisabled();
    await user.click(screen.getByRole('radio', { name: 'Segunda-feira, 15h30' }));
    await user.click(solicitar);

    const folha = screen.getByRole('dialog', { name: 'Confirmar solicitação' });
    const enviar = within(folha).getByRole('button', { name: 'Enviar solicitação' });
    expect(enviar).toBeDisabled();
    await user.click(within(folha).getByRole('checkbox'));
    await user.click(enviar);
    expect(within(folha).getByRole('heading', { name: 'Solicitação enviada' })).toBeInTheDocument();

    await user.click(within(folha).getByRole('button', { name: 'Ver minhas sessões' }));
    expect(titulo('Perfil')).toBeInTheDocument();
    const sessoes = screen.getByRole('dialog', { name: 'Minhas sessões' });
    expect(within(sessoes).getByText('Segunda-feira, 15h30')).toBeInTheDocument();

    await user.click(within(sessoes).getByRole('button', { name: 'Cancelar solicitação' }));
    expect(useLoja.getState().solicitacoes).toHaveLength(0);
  });
});

describe('Perfil', () => {
  beforeEach(cadastrar);

  it('mostra os dados e sai', async () => {
    const user = abrir({ tela: 'perfil' });
    expect(screen.getByText('Marina')).toBeInTheDocument();
    expect(screen.getByText('marina@exemplo.com')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Sair' }));
    expect(titulo(/conectando histórias/i)).toBeInTheDocument();
    expect(useLoja.getState().usuario.cadastrado).toBe(false);
  });
});
