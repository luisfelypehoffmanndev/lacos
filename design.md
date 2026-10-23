# Laços — Sistema de Design & Especificação de Interface (UI/UX)

> **Diretrizes Visuais, Design Tokens e Telas do Protótipo**  
> **Projeto Acadêmico:** Curso de Psicologia (4º Semestre) — FASA (Faculdade Santo Ângelo)  
> **Evento:** FASA SUMMIT (Novembro/2026)  
> **Skill Base:** `frontend-design`  
> **Compromisso:** Visual intencional, acessível, humanizado e estritamente livre de clichês de inteligência artificial (Anti-AI Slop).

---

## 1. Filosofia de Design & Identidade

O design do **Laços** evita deliberadamente os dois extremos mais comuns em aplicativos do gênero:
1. **O ambiente hospitalar/clínico frio:** fundos brancos assépticos, azul-ciano cirúrgico e fontes técnicas que aumentam a sensação de adoecimento e despersonalização.
2. **O ambiente infantil/creche:** tons pastel açucarados e elementos fofinhos que infantilizam o cuidador adulto e reduzem a seriedade da sua rotina diária.

A identidade visual do **Laços** remete a **uma sala de estar acolhedora no final da tarde**: superfícies foscas e aquecidas, contrastes firmes, tipografia humanista e cores concentradas nos pontos de ação e identificação dos pilares.

---

## 2. Regras Estritas Anti-AI Slop

Para evitar o visual sintético e repetitivo que caracteriza interfaces geradas por IA, este projeto segue regras de eliminação de vícios:

- ❌ **Sem degradês roxos e cósmicos genéricos:** Banido qualquer uso de gradientes roxo-índigo (`from-purple-500 to-indigo-600`) como "truque" de modernidade.
- ❌ **Sem o clichê "SaaS Card Kit":** Não empilhar cards com o mesmo border-radius, mesma sombra flutuante cinza e borda idêntica em todas as seções. Cada tipo de dado (post de comunidade, artigo, card de psicólogo) tem sua própria anatomia e ritmo visual.
- ❌ **Sem métricas de vaidade falsas:** Proibido exibir contadores vazios como "Mais de 10.000 vidas transformadas" ou contagens de likes em feeds de desabafo de mães exaustas.
- ❌ **Sem rótulos em caixa alta com tracking esticado:** Evitar títulos artificiais do tipo `FEATURE — EXPERIÊNCIA DO USUÁRIO`. Usar títulos em caixa baixa/alta normal e diretos.
- ❌ **Sem positividade tóxica no copywriting:** Todo texto fala com sinceridade e respeito à dor do usuário. Nunca usar frases como *"Tudo vai dar certo se você sorrir!"*.
- ❌ **Sem animações com bounce histérico:** Micro-interações respeitam `prefers-reduced-motion` e mantêm tempos suaves de 200–260ms.

---

## 3. Tokens de Cor & Acessibilidade (WCAG 2.2 AA/AAA)

### Cores Estruturais
| Token | Hex | Papel na Interface | Contraste |
|---|---|---|---|
| `canvas-base` | `#FAF6F0` | Fundo geral da aplicação (off-white aquecido, reduz fadiga visual) | — |
| `surface-card` | `#FFFFFF` | Superfície de cards e áreas interativas | 1.1:1 sobre canvas |
| `surface-subtle` | `#F4EEE5` | Fundos de campos de entrada e divisores suaves | 1.2:1 sobre canvas |
| `ink-main` | `#1A2826` | Texto primário (verde-floresta quase preto, acolhedor e profundo) | 14.2:1 sobre canvas (AAA) |
| `ink-muted` | `#536360` | Textos secundários, datas, metadados e legendas | 5.1:1 sobre canvas (AA) |
| `border-soft` | `#E3DCD1` | Linhas de contorno sutis e divisores funcionais | 1.4:1 sobre canvas |

### Cores Temáticas dos Pilares (Alinhadas ao Fichamento FASA)
Cada pilar possui uma cor de assinatura reconhecível e harmoniosa:

| Pilar | Cor Primária | Fundo Suave (Badge/Card) | Significado Semiótico |
|---|---|---|---|
| **Pilar 1: Comunidade** | `#D46E49` (Terracota Quente) | `#FCEEE7` | Calor humano, abraço, troca orgânica entre famílias atípicas |
| **Pilar 2: Conteúdos (Mural)** | `#C7912E` (Âmbar Mostarda) | `#FBF3DF` | Esclarecimento, orientação educativa e combate à desinformação |
| **Pilar 3: Psicoterapia Breve** | `#7567AF` (Lavanda Calmo) | `#EFEBF7` | Introspecção, cuidado clínico, serenidade e acolhimento com CRP |
| **Suporte Geral (CTA)** | `#336C63` (Verde-Sálvia Profundo) | `#E5EFEA` | Equilíbrio e ação confiante para botões principais |
| **Ajuda Imediata (Crise/CVV)** | `#2B446E` (Azul-Petróleo Noturno) | `#EAF0F9` | Estabilidade e sobriedade para canal de emergência (CVV 188) |

### Modo Calmo (Sensory Safe Mode)
O app inclui um alternador de **Modo Calmo** acessível no topo ou no perfil:
- Reduz a saturação geral de cores em 40%.
- Desliga transições automáticas e animações contínuas.
- Aumenta o espaçamento entre linhas e o tamanho mínimo da fonte para leitura desobstruída.

---

## 4. Tipografia & Escala de Leitura

- **Família Primária (Interface & Conteúdo):** `Atkinson Hyperlegible` (ou `Inter` como fallback limpo). Desenvolvida especificamente pelo *Braille Institute* para máxima legibilidade, com distinção clara entre caracteres críticos (`I`, `l`, `1`, `O`, `0`).
- **Família de Apoio (Títulos e Boas-Vindas):** `Nunito` / `Fraunces Soft`, trazendo curvas humanas que remetem a afeto sem tom infantil.

| Nível | Tamanho | Entrelinha | Peso | Uso |
|---|---|---|---|---|
| `hero` | 28px | 34px | SemiBold (600) | Boas-vindas e frases principais de impacto |
| `title-lg` | 22px | 28px | SemiBold (600) | Títulos das telas dos pilares e saudações |
| `title-md` | 18px | 24px | Medium (500) | Nomes de profissionais e títulos de artigos |
| `body-main` | 16px | 24px | Regular (400) | Textos de desabafos e parágrafos de artigos |
| `body-sm` | 14px | 20px | Regular (400) | Informações secundárias e formulários |
| `caption` | 12px | 16px | Medium (500) | Badges de tags e registros de CRP |

---

## 5. Especificação Detalhada das Telas (Conforme Referências e Fichamento)

### Tela 1: Boas-Vindas (Onboarding)
*Baseada em: `02-ref-boas-vindas.jpeg`, `01-painel-geral-briefing.jpeg` e `mascote.jpeg`*
- **Topo / Ilustração:** Ondas suaves entrelaçadas em degradê suave das três cores dos pilares (terracota, âmbar, lavanda).
- **Mascote:** O smartphone amigável com cérebro acolhedor (`mascote.jpeg`) posicionado com um gesto afetuoso de boas-vindas.
- **Identidade:** Wordmark elegante *"Laços: Conectando histórias e fortalecendo famílias."*
- **Texto Principal:**  
  *"Aqui você não está só."*  
  *"Uma rede de apoio, escuta e cuidado pensada especialmente para famílias atípicas e cuidadores."*
- **Ações:**
  - Botão Primário (Verde-Sálvia): `Começar minha jornada` (leva ao cadastro).
  - Botão Secundário: `Já faço parte da rede` (login rápido).

### Tela 2: Identificação & Cadastro Acolhedor
*Baseada em: `03-ref-login-cadastro.jpeg` e Fichamento da FASA*
- **Princípio:** Fricção quase zero, respeito à privacidade.
- **Campos:**
  1. *Como gostaria de ser chamado(a)?* (Nome ou apelido social).
  2. *Seu e-mail* (para login e envio de orientações).
  3. *Foto de perfil (opcional):* Permite upload ou seleção de 4 avatares ilustrados inclusivos e suaves.
  4. *Gênero:* Opções: `Mulher`, `Homem`, `Não-binário`, `Prefiro descrever` e `Prefiro não informar`.
  5. *Papel de cuidado (opcional):* Seleção múltipla rápida (`Mãe atípica`, `Pai atípico`, `Irmão/Irmã`, `Cônjuge`, `Outro familiar cuidador`).
- **Ação:** Botão destacado `Entrar no Laços`.

### Tela 3: Menu Principal (Hub de Acolhimento)
*Baseada em: `04-ref-menu-principal.jpeg`*
- **Header Superior:**
  - Saudação personalizada: *"Bom dia, [Nome]"*.
  - Mensagem do dia humanizada: *"Hoje você pode fazer só o que for possível. O possível já é muito."*
  - Atalho do Perfil (avatar no canto superior direito).
- **Os 3 Cards Principais dos Pilares:**
  1. **Comunidade:** Fundo terracota suave, ícone de balões de diálogo conectados, título *"Comunidade"*, legenda *"Espaço seguro para trocar vivências, desabafar e apoiar outros familiares."*
  2. **Conteúdos (Mural):** Fundo âmbar suave, ícone de página com ilustração, título *"Conteúdos"*, legenda *"Artigos educativos e orientações sobre sobrecarga, direitos e rotina."*
  3. **Psicoterapia Breve:** Fundo lavanda suave, ícone de psicólogos com elo de apoio, título *"Psicoterapia Breve"*, legenda *"Agendamento individualizado com psicólogos credenciados (CRP)."*
- **Faixa de Suporte e Acolhimento Imediato:** Banner discreto: *"Momento difícil agora? Converse com o CVV (188) — Ligação gratuita 24h"*.

### Tela 4: Comunidade (Feed Microblog / Threads)
*Baseada em: `05-ref-comunidade-twitter.jpeg`*
- **Barra de Abas:** `Todos os Relatos` | `Maternidade Atípica` | `Direitos & Laudos` | `Desabafos`.
- **Card de Postagem:**
  - Avatar do autor com identificação: `Ana Paula • Mãe do Theo (TEA Nível 2)`.
  - Tempo decorrido (`Há 45 min`).
  - Texto do relato sincero e realista.
  - Aviso de Conteúdo Sensível (CW) se o relato tocar em cansaço extremo ou crise.
  - **Barra de Interações:**
    - Botão `🤗 Abraço (24)`
    - Botão `💙 Compreendo (18)`
    - Botão `💬 Comentários`
    - Botão discreto para a aba de `Sugestões / Denúncia`.
- **Botão Flutuante (FAB):** Ícone com fundo terracota para criar novo relato (com checklist de proteção a menores).

### Tela 5: Conteúdos / Mural Educativo
*Baseada em: `07-ref-conteudos-agendamento.jpeg` e Fichamento FASA*
- **Carrossel de Tópicos:** Filtros: `Crises Sensoriais`, `Escola Inclusiva`, `BPC e Direitos`, `Sobrecarga Materna`.
- **Card Principal em Destaque:**
  - Imagem de capa acolhedora (sem fotos desumanizantes).
  - Badge de tempo: `⏱️ 3 min de leitura • Com áudio disponível`.
  - Título: *"Como acolher a desregulação sensorial sem negligenciar a sua própria exaustão"*.
  - Parágrafo introdutório claro.
  - Disclaimer formal visível: *"Conteúdo educativo produzido por psicólogas(os). Não substitui psicoterapia."*
  - Botão `Ler artigo completo` ou `Ouvir áudio 🎧`.

### Tela 6: Psicoterapia Breve & Agendamento Demonstrativo
*Baseada em: `07-ref-conteudos-agendamento.jpeg`, `01-painel-geral-briefing.jpeg` e Fichamento FASA*
- **Aviso Ético Obrigatório:**
  *"As sessões de psicoterapia breve são focadas no acolhimento pontual e na demanda emocional do familiar/cuidador. Este serviço não atende a pessoa cuidada, não substitui tratamento de longo prazo nem pronto-socorro."*
- **Vitrine de Psicólogos Credenciados:**
  - Card de profissional: Foto profissional humanizada, Nome completo, **CRP 06/142850 (Ativo)**.
  - Qualificação: *Pós-graduada em Psicologia Social e Comunitária • Especialista em Parentalidade Atípica*.
  - Indicação clara de **Valor Social (R$ 80,00 a R$ 180,00 por sessão)** acordado na 1ª sessão.
  - Próximos horários disponíveis em chips clicáveis (`Hoje, 16h00`, `Amanhã, 10h30`, `Quinta, 19h00`).
  - Botão de ação: `Agendar Sessão Demonstrativa`.
- **Modal de Confirmação:** Resumo das informações, lembrete ético e botão de adicionar à agenda.

### Tela 7: Perfil do Cuidador
*Baseada em: `06-ref-perfil.jpeg`*
- **Cabeçalho:** Banner em verde-sálvia suave com avatar sobreposto e botão de edição rápida.
- **Identificação:** Nome, e-mail e badges de identificação atípica.
- **Seção de Configurações Acessíveis:**
  - Alternador do **Modo Calmo (Sensory Safe)**.
  - Ajuste de tamanho da fonte (`Normal`, `Grande`, `Muito Grande`).
  - Meus Relatos, Artigos Salvos e Sessões Agendadas.
  - Canal de Privacidade e Proteção de Dados (LGPD).
  - Botão de Saída Rápida de Segurança e Botão de Reset da Demonstração.

---

## 6. Moldura do Dispositivo & Arquitetura Técnica do Shell

1. **Moldura Mobile Dinâmica:** Simulador de smartphone moderno (proporções 390x844) com Dynamic Island/Notch, barra de status (hora atual, bateria, Wi-Fi) e indicador da Home.
2. **`ScreenPortal` Integrado:** Portais de modais, drawers e toasts montados dentro do elemento da tela do celular (`transform: translateZ(0)`), impedindo que o modal escape da moldura no desktop.
3. **Alternador Responsivo Automático:**
   - Em telas maiores (desktop/notebook): exibe a moldura de celular com controles de teste ao lado.
   - Em telas de celulares reais (< 500px): remove a moldura exterior automaticamente e ocupa 100% da tela nativa do aparelho com as *safe-areas* reais.
4. **Navegação Fixa Inferior (Bottom Navigation Bar):**
   - 4 destinos com ícones e rótulos sempre visíveis:
     1. 🏠 *Início*
     2. 💬 *Comunidade*
     3. 📖 *Conteúdos*
     4. 🌿 *Terapia*
