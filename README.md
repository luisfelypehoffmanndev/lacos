# Laços — Protótipo de Aplicativo Mobile

> **Conectando histórias e fortalecendo famílias**  
> Protótipo mobile de alta fidelidade desenvolvido para famílias atípicas e cuidadores de pessoas neurodivergentes e com transtornos psicológicos.  
> Projeto do 4º Semestre de Psicologia — Faculdade Santo Ângelo (FASA) para o **FASA SUMMIT**.

---

## 🚀 Como Executar o Protótipo

O servidor já está configurado e pronto para rodar:

```bash
# Na pasta do projeto (C:\Users\luisf\Projetos\lacos)
bun dev
# ou
npm run dev
```

Abra no navegador em:
- **Computador:** [http://localhost:5173/](http://localhost:5173/) (com simulador de moldura de iPhone 16 / Android, barra de status dinâmica e controles de apresentação)
- **Celular Real (na mesma rede Wi-Fi):** Acesse pelo IP de rede exibido no terminal (ex: `http://192.168.100.143:5173/`). Em telas menores que 500px, a moldura se desativa automaticamente e o app assume tela cheia nativa!

---

## 📱 Telas Implementadas

| # | Tela | Inspiração | Destaques |
|---|---|---|---|
| 1 | **Boas-Vindas** | `02-ref-boas-vindas.jpeg` & `mascote.jpeg` | Mascote oficial afetuoso, proposta de valor e início rápido. |
| 2 | **Identificação & Cadastro** | `03-ref-login-cadastro.jpeg` | Escolha de avatares inclusivos, identificação do papel familiar e opções neutras de gênero. |
| 3 | **Menu Principal (Hub)** | `04-ref-menu-principal.jpeg` | Saudação personalizada, reflexão do dia sem positividade tóxica, check-in emocional e os 3 cards dos pilares. |
| 4 | **Pilar 1: Comunidade** | `05-ref-comunidade-twitter.jpeg` | Feed estilo microblog, abas temáticas, reações empáticas (`🤗 Abraço`, `💙 Compreendo`, `🌱 Força`), filtro de conteúdo sensível (CW) e novo relato com checklist ético do ECA. |
| 5 | **Pilar 2: Conteúdos & Mural** | `07-ref-conteudos-agendamento.jpeg` | Cards educativos sobre crises sensoriais e direitos, leitor de artigo completo com **Player de Áudio em Voz Alta (pt-BR)** e referências científicas (Misquiatti et al., 2015). |
| 6 | **Pilar 3: Psicoterapia Breve** | `07-ref-conteudos-agendamento.jpeg` | Explicação dos limites da abordagem, vitrine de psicólogos com registro CRP ativo, horários para agendamento demonstrativo e aceite ético (Resoluções CFP 13/2022 e 09/2024). |
| 7 | **Perfil do Cuidador** | `06-ref-perfil.jpeg` | Resumo cadastral, sessões agendadas com opção de desmarcar, artigos salvos, transparência LGPD e botão de reiniciar demonstração. |

---

## 🌿 Recursos Exclusivos de Acessibilidade & Anti-AI Slop

- **Blindagem Anti-AI Slop:** Paleta orgânica terrosa (verde-sálvia, terracota, mostarda e lavanda sobre linho suave), tipografia **Atkinson Hyperlegible** (feita pelo Braille Institute), zero gradientes roxos sintéticos e zero contadores falsos de vaidade.
- **Modo Calmo (Sensory Safe):** Alternador no painel que reduz a saturação de cor em 40% e desativa transições e animações, ideal para quem está sob sobrecarga sensorial.
- **Ajuste de Tamanho do Texto:** Suporte a 1x, 1.1x e 1.2x mantendo a proporção de leitura.
- **ScreenPortal:** Todos os modais e folhas de leitura abrem estritamente dentro da tela do aparelho simulado.
- **Canal de Apoio Imediato:** Banner permanente do **CVV 188** com atalho para discagem telefônica.

---

## 📂 Arquivos de Especificação

- **[PROJETO.md](file:///C:/Users/luisf/Projetos/lacos/PROJETO.md):** Fundamentação teórica, análise de mercado, personas reais, legislação (CFP, LGPD, ECA).
- **[design.md](file:///C:/Users/luisf/Projetos/lacos/design.md):** Sistema de design tokens, regras de contraste WCAG AA/AAA e anatomia visual.
- **[referencias/](file:///C:/Users/luisf/Projetos/lacos/referencias):** Pasta com todas as 8 imagens originais e o PDF do fichamento da FASA.
