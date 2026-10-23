# Laços

Protótipo navegável do **Laços**, rede de apoio para famílias atípicas: comunidade, conteúdos de
psicólogos e psicoterapia breve. Projeto do curso de Psicologia (4º semestre) da FASA para o
FASA Summit, 10/11/2026.

- **[PROJETO.md](PROJETO.md)** — proposta, fundamentação, ética e limites (fiel ao fichamento).
- **[design.md](design.md)** — identidade visual, tokens e especificação de cada tela.
- **[docs/PLANO.md](docs/PLANO.md)** — o que foi refeito e o que está pronto.
- **[referencias/](referencias)** — fichamento, painel do grupo, logo, mascote e telas de inspiração.

## Rodar

Precisa do [Bun](https://bun.sh) (ou Node 20+ com npm).

```bash
bun install
bun dev          # http://localhost:5173
```

- **No computador:** o app aparece dentro de um celular, com a jornada do usuário ao lado
  (pular para qualquer tela), **Reiniciar demonstração** e **Ver as 7 telas lado a lado**.
- **No celular:** na mesma rede Wi-Fi, abra o endereço "Network" que aparece no terminal
  (ex.: `http://192.168.0.10:5173`). Em telas de até 600 px o app ocupa a tela inteira.
- Cada tela tem link próprio: `#/inicio`, `#/comunidade`, `#/conteudos`, `#/psicoterapia`,
  `#/perfil`, `#/telas` (lado a lado).

## Apresentar sem internet

Fotos, fontes e marca estão dentro do projeto. Para não depender do servidor de desenvolvimento:

```bash
bun run build
bun run preview  # serve a pasta dist/ e mostra o endereço para os celulares
```

## Testes

```bash
bun run test     # 60 testes: dados, navegação e os fluxos de cada tela
```

## Estrutura

```
src/
  app/            o aplicativo
    telas/        uma por tela da jornada
    componentes/  folha, abas, avatar, laço, avisos, relato...
    navegacao.tsx pilha de telas e links por tela
  estado/         dados do usuário (zustand, salvo no navegador)
  dados/          relatos, conteúdos e psicólogos fictícios
  palco/          moldura de celular e painel de apresentação
  estilos/        tokens de cor e tipografia
public/
  marca/          logo, letreiro e mascote sem fundo
  img/            capas de conteúdo e fotos dos psicólogos
```
