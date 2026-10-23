# Laços — Design do protótipo

> Sistema visual e especificação das telas. Tudo o que está aqui existe no código;
> se mudar um, mude o outro.
> Projeto de Psicologia (4º semestre, FASA) para o FASA Summit, 10/11/2026.

---

## 1. Ponto de partida

A identidade **já foi definida pelo grupo** (fichamento, item 19: "Escolher nome, logo, paleta
de cores — OK"). O design do app parte dela, não a reinventa:

| Peça | Arquivo | Uso no app |
|---|---|---|
| Símbolo (cérebro + balão + laço) | `public/marca/simbolo.png` | Ícone da aba do navegador, cabeçalho do palco |
| Letreiro "laços" | `public/marca/letreiro.png` | Cabeçalho das telas internas |
| Letreiro branco | `public/marca/letreiro-branco.png` | Sobre fundos azuis (boas-vindas, cadastro) |
| Mascote (celular com cérebro e laço) | `public/marca/mascote.png` | Boas-vindas, estados vazios |

Os originais em JPEG estão em `referencias/`. As versões PNG têm o fundo branco removido.

**A ideia que amarra tudo: o laço.** A fita colorida do logo (azul → ciano → lilás → laranja →
amarelo) aparece como traço contínuo que dá voltas — grande na tela de boas-vindas (como na
referência 02), e como um fio discreto atrás da saudação do Início.
É o único elemento "decorativo" do app. Todo o resto é quieto.

O que evitamos, e por quê:
- **Clima de hospital** (branco puro, azul-ciano cirúrgico): aumenta a sensação de doença.
- **Clima infantil** (pastel açucarado, tudo arredondado demais): o usuário é o adulto que cuida.
- **Métricas de vaidade**: nada de "10.000 famílias atendidas". Contagens só onde a interação
  existe de fato (respostas e apoios num relato).
- **Positividade tóxica**: nenhum texto promete que "vai ficar tudo bem".

---

## 2. Cores

Amostradas dos pixels do letreiro e do símbolo originais (`referencias/Letter.jpeg` e `Logo.jpeg`),
da esquerda para a direita: marinho `#0C2E8B` → royal `#1040BB`/`#2B79F6` → ciano `#6ACAF2` →
lilás `#D6AFF8` → pêssego `#FAA048` → amarelo `#F9BB2D`. Toda a paleta sai daí.

### Base

| Token | Hex | Papel |
|---|---|---|
| `noite` | `#0A2480` | Fundo do palco e faixa de crise (o marinho do início do letreiro) |
| `tinta` | `#0E1F55` | Texto principal (14,4:1 sobre `fundo`) |
| `tinta-suave` | `#56618A` | Texto secundário, datas, legendas (5,6:1 sobre `fundo`) |
| `fundo` | `#F4F6FB` | Fundo das telas (branco levemente azulado, não creme) |
| `superficie` | `#FFFFFF` | Cartões, folhas, campos |
| `linha` | `#E1E6F2` | Divisores e contornos |

### Pilares (fichamento, item 11: "seções identificadas por nome e cores específicas")

| Pilar | Superfície | Texto sobre ela | Cor de ação / texto colorido | Contraste |
|---|---|---|---|---|
| Comunidade | `lilas` `#D6AFF8` | `tinta` | `lilas-forte` `#7A45CF` (texto branco) | 8,4:1 / 5,9:1 |
| Conteúdos | `laranja` `#FAA048` | `tinta` | `laranja-forte` `#A4520C` (sobre branco) | 7,6:1 / 5,5:1 |
| Psicoterapia breve | `azul` `#1D4FD8` | branco | `azul` | 6,6:1 |

### Quem usa cada cor (para não ficar tudo azul)

A **ordem** em que as cores aparecem segue o letreiro, da esquerda para a direita: marinho → azul →
ciano → lilás → laranja → amarelo. Vale para as abas, os blocos do Início e a passagem boas-vindas
(azul) → cadastro (ciano).


| Cor | Onde aparece |
|---|---|
| Azul | Só na **Psicoterapia** (topo, horários, solicitar) e na **boas-vindas** (o momento da marca). O fichamento pede a psicoterapia "identificada pela cor azul". |
| Ciano | Topo do **cadastro** (ciano-claro), fundo da aba Terapia ativa, privacidade, iniciais na comunidade. |
| Lilás | Comunidade: novo relato, apoiar, responder, denunciar. |
| Laranja | Conteúdos: filtros, título do texto, salvar. |
| Amarelo | Pessoa que usa o app: inicial no avatar, topo do **Perfil** (amarelo-claro), aba Perfil. |
| Marinho | Aba Início, faixa de crise, palco. |
| `tinta` | Ações neutras (Entrar no Laços, Enviar, pílulas selecionadas). |

No Perfil, cada atalho leva um ícone na cor da área a que pertence (sessões em azul, salvos em
laranja, relatos em lilás). Os tons claros aparecem em superfícies grandes; os fortes só em pontos de ação.

Apoio: `ciano` `#6ACAF2` e `amarelo` `#F9BB2D` (iniciais na comunidade, elos do bloco de psicoterapia).

### Fita (traço do laço)

`#0C2E8B` → `#2B79F6` → `#6ACAF2` → `#D6AFF8` → `#FAA048` → `#F9BB2D`

### Formas dos blocos do Início

Tons de cada pilar: lilás `#BF8CF2`/`#EBDAFC`; laranja `#FBB873`/`#E57E26`;
azul `#1440B8`/`#3D72F2` com elos `#6ACAF2` e `#F9BB2D`.

### Apoio em crise

Faixa em `noite` com texto branco (12:1). Sóbria, sem vermelho de alarme.

---

## 3. Tipografia

Fontes empacotadas no projeto (`@fontsource-variable/*`): funcionam sem internet.

- **Bricolage Grotesque** (títulos). Grotesca com personalidade nas curvas, conversa com o
  letreiro manuscrito sem ficar infantil. Usada pesada (700–800) e grande, como os títulos das
  referências 04 e 07.
- **Lexend** (todo o resto). Desenhada para reduzir esforço de leitura — adequada para quem
  lê no fim de um dia exaustivo.

| Nível | Tamanho / entrelinha | Peso | Uso |
|---|---|---|---|
| `titulo-xl` | 34 / 38 | Bricolage 800 | Boas-vindas, saudação do Início |
| `titulo-lg` | 26 / 30 | Bricolage 750 | Título de cada tela de pilar |
| `titulo-md` | 19 / 24 | Bricolage 700 | Título de conteúdo, nome do psicólogo |
| `corpo` | 16 / 24 | Lexend 400 | Relatos, artigos |
| `corpo-sm` | 14 / 20 | Lexend 400 | Formulários, descrições |
| `legenda` | 12,5 / 16 | Lexend 500 | Datas, CRP, rótulos de chips |

Nada abaixo de 12,5 px. Sem rótulos em CAIXA ALTA espaçada.

---

## 4. Forma, espaço e movimento

- Cantos: **28 px** nos cartões dos pilares (blocos grandes, ref. 04), **20 px** nas capas de
  conteúdo (ref. 07), **14 px** em campos e cartões de lista, **pílula** em botões e chips.
  Relatos da comunidade **não** são cartões: são linhas separadas por divisores (ref. 05).
- Margem lateral das telas: 20 px. Alvos de toque com no mínimo 44 px.
- Sombras só em elementos que flutuam (folhas, botão de novo relato, cartão do cadastro).
- Foco do teclado sempre visível (anel de 2 px).

### Movimento

Pequeno e em resposta ao toque, com uma curva só (`cubic-bezier(0.2, 0.8, 0.2, 1)`) e sem quique.
Há um único momento "de apresentação": a abertura da boas-vindas. `prefers-reduced-motion`
desliga todas as animações e a vibração. Tudo fica em `src/estilos/app.css`.

| Animação | Duração | Para quê |
|---|---|---|
| Abertura: as 3 fitas do laço se desenham em sequência, o mascote sobe | ~2,3 s no total (fitas 1,8 s cada, mascote 0,9 s), uma vez por carregamento | Apresentar a marca sem atrasar quem já conhece |
| Entrar numa tela: vem da direita / voltar: vem da esquerda / trocar de aba: só aparece | 220 ms / 160 ms | Mostrar se a pessoa avançou, voltou ou mudou de área |
| Folha sobe ao abrir e desce ao fechar | 220 ms / 200 ms | Mostrar de onde veio e para onde foi |
| Botões e cards encolhem levemente ao toque (`.tocavel`) | 140 ms | Confirmar o toque |
| Coração (apoiar) e marcador (salvar) pulsam ao marcar | 260 ms | Confirmar a ação |
| Relato recém-publicado chega com fundo lilás que se apaga | 1,2 s | Mostrar onde o relato entrou |
| ✓ de "Solicitação enviada" e "Mensagem enviada" se desenha | 420 ms | Fechar o fluxo com clareza |
| Aviso (toast) sobe 8 px; pílula da aba ativa acende; pílulas mudam de cor suavemente | 140–220 ms | Continuidade |
| Vibração de 12 ms (só Android) em apoiar, publicar e enviar solicitação | — | Confirmação tátil discreta |

---

## 5. Telas

Navegação inferior com 5 abas, rótulo sempre visível, na ordem das cores do letreiro: **Início**
(marinho), **Terapia** (azul), **Comunidade** (lilás), **Conteúdos** (laranja), **Perfil** (amarelo).
A aba ativa ganha a cor da sua área.

### 1. Boas-vindas — ref. 02 + painel do grupo
- Fundo `azul` cheio, laços coloridos dando voltas atrás do conteúdo.
- Letreiro branco no topo, mascote ao centro.
- Título: "Conectando histórias, fortalecendo famílias."
- Texto: o que o app é, para quem é, e os três pilares em uma frase.
- Botões: **Criar meu cadastro** (branco) e **Já tenho cadastro** (texto).

### 2. Cadastro — ref. 03
- Topo ciano-claro com curva, cartão branco sobreposto, campos com sublinhado (como na ref. 03).
- Campos (fichamento, item 13: "Login: Nome e Email; mais informações não serão necessárias"):
  - Como quer ser chamado(a) — obrigatório
  - E-mail — obrigatório, validado
  - Foto de perfil — opcional; enviar uma foto do aparelho ou ficar com a inicial
  - Gênero — Mulher, Homem, Não binário, Prefiro não informar
- Mensagens de erro dizem o que corrigir.
- Botão **Entrar no Laços**.

### 3. Início (menu principal) — ref. 04
- Topo: letreiro à esquerda, foto/inicial à direita (abre o Perfil).
- Saudação grande: "Olá, {nome}." + mensagem do dia, sincera e sem cobrança.
- Pilares na ordem das cores do letreiro, em blocos de cor chapada com uma composição geométrica no canto (semicírculos e quartos de círculo do quadro de inspirações do grupo, em tons da cor do pilar), ícone num círculo branco e texto embaixo:
  **Agende uma sessão de psicoterapia breve** (azul) em largura total — nome usado no fichamento —
  e, abaixo, Comunidade (lilás) e Conteúdos (laranja) lado a lado.
- Faixa de apoio em crise (CVV 188, SAMU 192).
- Atalho para **Sugestões e denúncias** (fichamento, item 14).

### 4. Comunidade — ref. 05
- Faixa com as regras de convivência (fichamento, item 15), que abre o texto completo.
- Relatos em lista: inicial colorida (a comunidade usa apelidos, sem fotos de rosto), nome,
  papel de cuidado ("Mãe de criança com TEA e TDAH"), tempo, texto.
- Ações: **Responder**, **Apoiar** (coração), **Compartilhar**, e "⋯" com **Denunciar**.
- Tocar no relato abre a conversa (ref. 05, direita) com respostas e campo para responder.
- Botão flutuante lilás **Novo relato**: folha com texto (até 500 caracteres) e confirmação
  obrigatória de que não expõe crianças ou terceiros (ECA; fichamento, item 15).

### 5. Conteúdos — ref. 07
- Título grande + filtros em chips (Todos, Autocuidado, Emoções, Neurodivergência, Família,
  Psicoterapia).
- Capas grandes com foto, tempo de leitura e título sobre a imagem, botão de seta (ref. 07, centro).
- Leitura (ref. 07, direita): capa, voltar, salvar, título, autoria com **CRP**, texto,
  **Ouvir** (voz do aparelho em português), referências e o **aviso ético integral** do
  fichamento (item 16) ao fim de todo conteúdo.

### 6. Psicoterapia breve — ref. 07 (detalhe) + fichamento item 13
- O que é a psicoterapia breve, em três frases.
- "Quando não é indicada" (expansível): atendimento é para o cuidador, não para a pessoa cuidada;
  orientação sem demanda própria; emergência.
- Valor social **R$ 80 a R$ 180** por sessão; número de sessões e objetivos definidos no
  contrato terapêutico da 1ª sessão (Resolução CFP nº 13/2022).
- Lista de psicólogos: foto, nome completo, CRP, formação. Sem estrelas, notas ou "mais procurado"
  (Nota Técnica CFP nº 01/2022: sem autopromoção).
- Tela do psicólogo: minicurrículo, horários por dia em chips (exemplo do fichamento: seg 14h,
  15h30, 17h; qua 9h, 19h; sex 11h). Barra inferior fixa: "R$ 80–180 / sessão" + **Solicitar sessão**.
- Confirmação: resumo + aceite (sigilo, contrato na 1ª sessão, não é serviço de emergência).
  Resultado: **Solicitação enviada** — quem confirma é o psicólogo.

### 7. Perfil — ref. 06
- Topo amarelo-claro com "Perfil" e editar; cartão branco sobreposto com foto, nome, papel.
- Cartão com e-mail e "no Laços desde".
- Lista de atalhos com ícone colorido e seta (ref. 06): Minhas sessões, Conteúdos salvos, Meus relatos,
  Sugestões e denúncias, Privacidade e dados.
- **Sair**.

---

## 6. Palco de apresentação (fora do app)

- **Desktop:** fundo `noite`, celular de 390 × 844 com ilha dinâmica e barra de status,
  escalado para caber na altura da tela. Ao lado, a jornada do usuário (pular para qualquer
  tela) e **Reiniciar demonstração**.
- **Celular real (< 600 px):** sem moldura, o app ocupa a tela inteira.
- **Lado a lado:** as 7 telas em sequência, para prints e slides.
- Cada tela tem link próprio (`#/inicio`, `#/comunidade`, `#/psicoterapia`...).
- Os dados ficam no navegador (localStorage); nada sai do aparelho.
