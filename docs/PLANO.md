# Plano de reestruturação do protótipo Laços

Iniciado em 23/10/2026. Entrega no FASA Summit: 08/11/2026 (apresentação em 10/11).
Marque `[x]` assim que cada item estiver pronto **e testado**.

## Decisões tomadas com o grupo

- Apresentação no notebook/projetor (moldura de celular) **e** em celulares reais (tela cheia).
- Tudo precisa funcionar **offline**: fotos, fontes e marca ficam dentro do projeto.
- Personas e psicólogos são **fictícios**; os nomes do grupo aparecem só nos créditos.
- Reestruturação completa: código morto removido, telas refeitas, testes automatizados.

## Diagnóstico da versão anterior

- design.md/README descreviam paleta terrosa, fonte Atkinson, Modo Calmo, banner do CVV,
  reações e vários psicólogos que **não existiam no código**, e contrariavam a marca do grupo.
- Dois apps misturados (`screens/mockup/*` em uso; `screens/*.tsx`, `shell/`, `components/`,
  `store/index.ts`, `seed/` mortos).
- Logo, letreiro e mascote em JPEG com fundo branco (quadrados brancos sobre o azul).
- Textos em inglês ("replies", "likes", "PROFILE"), rótulo copiado da especificação,
  telefone inventado, selo "ASD-STE100".
- Faltavam: fluxo de crise (CVV 188 / SAMU 192), limites da psicoterapia breve, consentimento,
  aba de Terapia, denúncia de publicação, mais de um psicólogo e de um conteúdo.
- Fotos carregadas da internet (quebram sem Wi-Fi). Nenhum teste. Sem git.

## Etapas

### 1. Base
- [x] git init + commit do estado inicial
- [x] Marca em PNG transparente (`public/marca/`): símbolo, letreiro, letreiro branco, mascote
- [x] Fotos locais em `public/img/` (capas de conteúdo e psicólogos, sem crianças)
- [x] Dependências: fontes locais (Lexend, Bricolage Grotesque), Vitest + Testing Library
- [x] Remover código morto e dependências sem uso

### 2. Documentação
- [x] design.md reescrito com a paleta real da marca, tipografia, componentes e telas
- [x] PROJETO.md revisado (pilares, cores, fluxo de crise, moderação, limites)
- [x] README com como rodar, testar e apresentar

### 3. Estado e dados (TDD)
- [x] Testes da loja: cadastro/validação, publicar, apoiar, responder, denunciar,
      salvar conteúdo, solicitar/cancelar sessão, sugestões, reiniciar
- [x] Loja (zustand + persist) passando nos testes
- [x] Dados fictícios: relatos, conteúdos (com aviso ético), psicólogos (CRP, minicurrículo, horários)

### 4. Telas (TDD com Testing Library)
- [x] Navegação (pilha + abas) independente por instância de celular
- [x] 1 Boas-vindas (ref. 02)
- [x] 2 Cadastro (ref. 03)
- [x] 3 Menu principal (ref. 04)
- [x] 4 Comunidade + publicação + novo relato com checklist de proteção (ref. 05)
- [x] 5 Conteúdos + leitura com áudio (ref. 07)
- [x] 6 Psicoterapia breve + psicólogo + solicitação com consentimento (ref. 07)
- [x] 7 Perfil + sessões + salvos + sugestões/denúncias + privacidade (ref. 06)
- [x] Apoio em crise (CVV 188 / SAMU 192) acessível no Início e na Terapia

### 5. Palco de apresentação
- [x] Moldura de celular no desktop, tela cheia em celular real
- [x] Painel com a jornada (pular para qualquer tela), reiniciar demonstração
- [x] Modo "todas as telas lado a lado" para prints/slides
- [x] Link direto por tela (`#/comunidade` etc.)

### 6. Verificação final
- [x] `bun run test` verde, `bun run build` sem erros
- [x] Prints de todas as telas revisados (desktop e 390 px)
- [x] Funciona sem internet (build servido localmente)

## Pendente do grupo (fora do código)

- [ ] Registrar as respostas das entrevistas (fichamento, item 8, está em branco). A versão do Gemini
      tinha inventado essas respostas no PROJETO.md; foram removidas.
- [ ] Testar no Wi-Fi do local do evento, ou levar o build (`bun run build && bun run preview`).

## Animações (pedido de 23/10/2026)

Pequenas, em resposta ao toque; uma única abertura na boas-vindas. `prefers-reduced-motion` desliga tudo.

- [x] Testes primeiro: vibração, direção da transição, apoiar vibra, relato recente destacado
- [x] Base de movimento no CSS (curva única, durações, keyframes, `.tocavel`)
- [x] Transição com direção: entrar da direita, voltar da esquerda, aba com fade
- [x] Folha desce ao fechar
- [x] Apoiar e salvar pulsam; relato publicado destacado; ✓ de sucesso se desenha; aviso sobe
- [x] Pílula da aba ativa aparece suave; cores das pílulas com transição
- [x] Abertura: laço se desenha e mascote sobe (uma vez por carregamento)
- [x] Vibração leve (Android) em apoiar, publicar e enviar solicitação
- [x] design.md atualizado, testes e build verdes, prints conferidos

## Ajustes de 24/10/2026
- [x] Cadastro: símbolo do Laços ao lado do letreiro no topo.
- [x] Psicoterapia: valor fixo por profissional dentro da faixa R$ 80–180 (Ana 120, Beatriz 150,
  Rafael 90), na lista, na tela do profissional e na confirmação. Testes em `psicologos.test.ts`.
