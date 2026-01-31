# Teste Front-End Cakto - [Eduardo Lopes Nowakoski]

## Decisões Técnicas

Usei **Next.js 14** com App Router: os dados do produto ficam no servidor e só o checkout roda no cliente, então manda menos JavaScript pro navegador. A parte de taxas e parcelas está em `lib/` (`fees.ts`, `cpf.ts`) em funções puras, assim dá pra testar com Jest sem precisar de React. TypeScript ajuda a deixar claro o que cada parte espera (cálculo, formulário, resumo).

**Tailwind** e **Material UI** eu escolhi por se tratar de um desenvolvimento que requer agilidade e sem um layout predefinido, então quis ganhar tempo no dev, também como tenho uma familiaridade grande com Tailwind, isso acelerou a estilização. Usei os dois juntos: Tailwind pro layout (mobile first, espaçamentos, destaque do PIX) e MUI pros campos e botões (TextField, Radio, Select, Button), validação em tempo real e acessibilidade. A lógica do formulário ficou no hook `useCheckoutForm` (estado, validação, resumo), e o Checkout só orquestra e usa componentes reutilizáveis: ProductCard, OrderSummary, SuccessDialog. Erro no submit aparece num Alert e dá pra fechar; sucesso abre um modal.

A validação de CPF segue o algoritmo oficial e aceita com máscara ou só os números. Formatação de moeda ficou em `lib/format.ts` (formatBRL) pra reaproveitar em qualquer lugar.

### Uso de IA

Esses foram os itens que eu usei o modelo GPT 5.2

- Validação do CPF (poderia usar alguma biblioteca para lidar com isso mas como era só essa validação básica deixei manual)
- Máscara de CPF manual (mesma coisa aqui, poderiamos usar alguma lib pra deixar isso mais automatizado)
- Lógica de cálculo de taxa baseado na regra de negócio
- Testes unitários (aqui fiz testes bem simples apenas para retratar um cenário mais real). Com mais tempo poderiamos fazer testes mais complexos pra explorar todas interatividades e regras de negócio de fato.

## Como Executar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000].

### Testes

```bash
npm test
```

---

Para ver o fluxo de erro no submit, use o e-mail **`erro@teste.com`** e finalize a compra. Esse valor só dispara um erro simulado no front.

## Se tivesse mais tempo, o que você faria para aumentar a conversão deste checkout?

1. **Menos campos de uma vez e mais confiança**  
   Pediria só e-mail e forma de pagamento na primeira tela. CPF e cartão ficariam no passo seguinte ou num modal. A pessoa sente que já avançou. Selos de segurança, garantia de 7 dias e depoimentos curtos ajudariam a passar confiança.

2. **Um upsell só e uma urgência leve**  
   Só um extra que faça sentido (bônus, mentoria), com preço fixo e botão direto: “Adicionar por R$ X”. Uma urgência leve, tipo timer discreto ou “X pessoas vendo agora”.

3. **PIX ainda mais na cara**  
   Destacar “sem taxa” e “aprovação na hora”. Ao escolher PIX, já mostrar o QR Code ou o botão de copiar código no próprio checkout, sem redirecionar.

4. **Medir e testar**  
   Trackear entrada no checkout, abandono por etapa e método escolhido. Aí dá pra testar copy de botão, ordem dos pagamentos e mensagem de desconto no PIX, ajustando com base nos dados.

## Features e melhorias adicionais (se tivesse mais tempo)

- **Testes mais completos**: testes unitários mais focados em regras de negócio e interatividade, testes de integração e E2E com Cypress para simular fluxos reais.
- **Fluxo de Git e releases**: branches por feature, commits semânticos.
- **CI/CD e Dependabot**: pipelines no GitHub Actions para rodar lint, testes e build em PRs; Dependabot para atualizações de dependências.
- **Documentação de componentes com Storybook**: criar catálogo de componentes e testes visuais/regressão para garantir consistência UI.
- **Acessibilidade (a11y)**: auditorias (axe/Lighthouse), correções de foco e navegação por teclado, e testes com leitores de tela.
- **Otimização de performance**: auditoria Lighthouse, otimização de imagens, lazy-loading, caching e tuning de SSR/ISR.
- **Feature flags e experimentação**: suporte para A/B tests e rollout gradual de features.
- **Internacionalização**: arquitetura para i18n (ex.: next-i18next) para suportar múltiplos idiomas.
