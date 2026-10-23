# Laços: conectando histórias e fortalecendo famílias

> Especificação do projeto, fiel ao fichamento do grupo (`referencias/Fichamento - Projeto Laços.pdf`).
> Quando este documento e o fichamento divergirem, vale o fichamento.

| | |
|---|---|
| **Status** | Protótipo navegável, com dados fictícios (ver seção 9) |
| **Curso** | Psicologia, 4º semestre — Faculdade Santo Ângelo (FASA) |
| **Grupo** | Joiciele Nascimento de Oliveira, Karen de Castro Kotlewski, Lucas Daniel Jung, Natalia Santiago |
| **Início** | 15/09/2026 |
| **Entrega** | 08/11/2026 — apresentação no FASA Summit em 10/11/2026 |

---

## 1. Proposta

Um espaço digital seguro, acolhedor e acessível onde famílias atípicas possam cuidar da própria saúde
emocional, encontrar informações confiáveis e trocar experiências com quem vive desafios semelhantes.

**Em uma frase:** uma plataforma de acolhimento e apoio às famílias atípicas, com psicoterapia breve,
conteúdos informativos e uma comunidade segura para compartilhar experiências.

**O que o app não pretende:** substituir profissionais de saúde.

### Público
- Pais e mães de crianças neurodivergentes (TEA, TDAH, entre outras).
- Familiares de pessoas com transtornos mentais, como depressão e ansiedade.
- Cônjuges, filhos adultos e outros familiares que assumem responsabilidades de cuidado.
- Cuidadores com sobrecarga emocional, insegurança ou necessidade de trocar experiências.

**Não é público-alvo:** quem não faz parte de famílias atípicas ou não busca informação, acolhimento ou
suporte ligado à saúde emocional e à rotina atípica.

---

## 2. Problema e pergunta norteadora

Famílias atípicas podem viver sobrecarga emocional, isolamento e dificuldade de encontrar espaços de escuta
e troca com quem passa por situações semelhantes, além de dificuldade de acesso a informações e serviços
psicológicos adequados.

> *Como oferecer um espaço acessível, seguro, acolhedor e diferenciado de troca entre famílias atípicas,
> aliado a informações psicológicas qualificadas e possibilidade de atendimento psicológico breve para
> demandas específicas?*

### Pesquisa com o público
- **Método:** entrevista presencial, 2 participantes — uma mãe de criança com TEA e TDAH; um pai de
  criança com TOD e TEA.
- **Perguntas:** como é ser familiar/cuidador; maiores dificuldades; falta de apoio ou de espaço de
  conversa; o que um app deveria oferecer; opinião sobre comunidade + conteúdos + atendimento.
- **Respostas e como influenciaram o projeto:** ⚠️ **ainda não registradas no fichamento (item 8).**
  Preencher antes da entrega — é a evidência própria do grupo.

---

## 3. Justificativa e lacuna

- **Para a Psicologia:** tema relevante, com poucos recursos disponíveis e baixo suporte.
- **Para o meio digital:** acessibilidade, redução de custos, otimização do tempo, aproveitamento de
  recursos digitais.

| Iniciativa | O que oferece | O que falta |
|---|---|---|
| **Acolhe Mais (SUS)** | Teleatendimento em saúde mental por psicólogas para mães e familiares de pessoas com deficiência, transtornos do neurodesenvolvimento ou doenças raras | Rede contínua de troca entre familiares |
| **Cognitiva+** | Plataforma de saúde para famílias atípicas: telemedicina, especialistas, comunidade, conteúdos e, em um plano, telepsicologia (2 sessões/mês) | Proposta de saúde e benefícios para a família toda, sem foco específico no bem-estar emocional do cuidador |
| **Laços** | Comunidade, informação qualificada e psicoterapia breve no mesmo lugar | — |

---

## 4. Objetivos

**Geral:** desenvolver um protótipo de aplicativo para famílias atípicas que favoreça redes de apoio, troca
de experiências, acesso a informação psicológica qualificada e aproximação com a psicoterapia breve.

**Específicos:**
1. Promover interação e troca de experiências entre famílias atípicas.
2. Disponibilizar conteúdos produzidos por profissionais qualificados.
3. Oferecer possibilidade de agendamento de psicoterapia breve.
4. Proporcionar um espaço de acolhimento e pertencimento.
5. Facilitar o acesso a informações sobre saúde mental.

---

## 5. Referencial teórico

| Referência | Uso no projeto |
|---|---|
| MISQUIATTI, A. R. N. et al. Sobrecarga familiar e crianças com transtornos do espectro do autismo: perspectiva dos cuidadores. *Revista CEFAC*, v. 17, n. 1, p. 192–200, 2015. | Justifica o público-alvo |
| HEGENBERG, M. *Psicoterapia breve*. 2. ed. São Paulo: Casa do Psicólogo, 2004. | Justifica a abordagem |
| NOVAIS, M. C.; SILVA, G. A. Psicólogas(os) brasileiras(os) e prestação de serviços mediados por TDICs: regulamentações e desafios. *Psicologia USP*, v. 36, 2025. | Justifica o meio digital |

---

## 6. Funcionalidades e como aparecem no protótipo

Cada pilar tem nome, cor e ícone próprios (fichamento, item 11). Cores e telas: ver `design.md`.

### Comunidade — lilás
- **Fichamento:** visualizar publicações e depoimentos; compartilhar experiências, dúvidas e relatos;
  interagir (curtir, enviar, responder); orientações de convivência.
- **No protótipo:** feed no estilo microblog; **apoiar**, **responder** (abre a conversa),
  **compartilhar** (simulado) e **denunciar**; regras de convivência sempre visíveis; novo relato exige
  confirmar que não expõe crianças ou terceiros. Participantes aparecem com apelido e inicial, sem foto
  de rosto.

### Conteúdos — laranja
- **Fichamento:** publicações educativas sobre saúde mental, neurodivergência e relações familiares,
  feitas por psicólogos com CRP ativo; curtir, compartilhar e salvar.
- **No protótipo:** 6 conteúdos com capa, filtro por tema, autoria com CRP, leitura em voz alta,
  referências, **salvar** e o aviso ético integral ao fim de cada texto:
  > *Este conteúdo tem finalidade informativa e educativa. Ele não substitui uma avaliação ou um
  > acompanhamento psicológico individualizado. Cada pessoa possui necessidades e experiências próprias.
  > Em caso de sofrimento psicológico, procure orientação profissional.*
- Os textos evitam diagnóstico, prescrição e promessa de resultado (fichamento, item 16).

### Psicoterapia breve — azul
- **Fichamento:** seção "Agende uma sessão de psicoterapia breve"; texto curto sobre a modalidade;
  psicólogos com foto, nome completo, CRP e breve apresentação; dias e horários; solicitar/agendar.
- **No protótipo:** o que é, como funciona, quando **não** é indicada, valor social de **R$ 80 a
  R$ 180**, 3 profissionais fictícios (Ana Souza usa exatamente o exemplo do fichamento), escolha de
  horário e solicitação com aceite. A solicitação fica "aguardando confirmação" — quem confirma é o
  profissional.
- **Número de sessões e objetivos:** definidos no contrato terapêutico da 1ª sessão (Resolução CFP
  nº 13/2022), sob responsabilidade do psicólogo, não do app.
- **Não é indicada quando:** o objetivo é atender ou orientar sobre a pessoa cuidada; a demanda não tem
  relação com o papel de cuidador; há emergência.
- **Encaminhamento:** quando a demanda ultrapassa a modalidade, o profissional orienta e encaminha.
  Ao fim, o usuário segue com acesso à comunidade e aos conteúdos.

### Cadastro e perfil
- **Cadastro (fichamento, item 13):** só nome e e-mail obrigatórios; foto e gênero opcionais (com
  "Prefiro não informar").
- **Perfil:** dados, minhas sessões (com cancelamento), conteúdos salvos, meus relatos, sugestões e
  denúncias, privacidade e dados, sair.

### Sugestões e denúncias
- Aba "sugestões" (fichamento, item 14): no Início e no Perfil. Denúncia de relato direto pelo "⋯".

### Situação de risco
- Faixa **"Momento difícil agora?"** com **CVV 188** e **SAMU 192** no Início e na Psicoterapia.
  O fichamento prevê que a sessão de acolhimento trate urgências e que o psicólogo encaminhe; a faixa
  garante um caminho imediato mesmo sem sessão marcada.

---

## 7. Ética e responsabilidade

1. **Código de Ética Profissional do Psicólogo (Resolução CFP nº 10/2005):** art. 1º, alíneas "b" e "c"
   (responsabilidade e qualidade fundamentada na ciência); "e", "f" e "h" (acordos, informação sobre o
   serviço, encaminhamentos); art. 9º (sigilo).
2. **Resolução CFP nº 13/2022:** define psicoterapia (art. 1º, parágrafo único) e seus princípios (art. 2º).
3. **Resolução CFP nº 09/2024:** exercício profissional mediado por TDICs.
4. **Nota Técnica CFP nº 01/2022:** publicidade sem autopromoção — o app mostra só identificação e
   formação, sem notas, estrelas ou destaques.
5. **LGPD (Lei nº 13.709/2018):** dados de saúde são sensíveis (art. 5º, II); medidas de segurança (art. 46).
6. **Consentimento e limites:** o conteúdo das sessões fica em ambiente privado, nunca na comunidade nem
   em divulgação. A comunidade é convivência entre usuários; o atendimento é serviço profissional,
   individual e sigiloso.

### Segurança da comunidade
- **Regras:** respeito; comunicação educada; não compartilhar informação de terceiros; sem julgamentos,
  preconceito ou ofensas; sem diagnósticos ou tratamentos; espaço seguro e inclusivo.
- **Proibido:** ofensas, ameaças, preconceito, exposição de informações pessoais, spam.
- **Crianças e terceiros:** proibido divulgar fotos, nomes, documentos ou localização sem autorização.
- **Bloqueio:** temporário ou permanente, conforme a gravidade.

### Conteúdos sensíveis (versão real)
Criptografia dos dados armazenados, HTTPS/TLS, controle de acesso, senhas protegidas e autenticação em
dois fatores, separação entre dados da comunidade e dados clínicos, sistema de denúncia e resposta a
incidentes.

---

## 8. Avaliação

- **Indicadores:** participação e acessos.
- **Segurança e qualidade dos conteúdos:** comunidade e aba de sugestões.
- **Feedback:** comentários na comunidade e aba de denúncias/sugestões.

---

## 9. Limitações do protótipo

- Demonstra proposta, design e organização das funcionalidades. Não está nas lojas de aplicativos.
- Não tem cadastro real, agendamento real, mensagens em tempo real nem armazenamento seguro: tudo fica no
  navegador do aparelho (localStorage) e some ao reiniciar a demonstração.
- Não verifica registros de CRP nem tem estrutura de atendimento.
- **Pessoas, relatos, psicólogos, fotos de perfil e números de CRP são fictícios.** Fotos de banco de
  imagens (Unsplash), sem crianças.

### Para uma versão real
Desenvolvimento para Android e iOS com testes de segurança; servidores, banco de dados seguro e
autenticação; verificação de CRP, psicólogos habilitados e protocolos de atendimento conforme o CFP;
adequação à LGPD; modelo de negócio, suporte, termos de uso e cobrança.

---

## 10. Pendências do grupo

| Tarefa | Responsável | Status |
|---|---|---|
| Nome, logo, paleta de cores | Todos | OK |
| Registrar respostas das entrevistas (item 8) | — | **Pendente** |
| Dividir a escrita na plataforma | Lucas/Joiciele | Confirmar |
| Organizar apresentação | Todos | Confirmar |
| Parte visual: cartas e panfletos | Todos | Confirmar |
