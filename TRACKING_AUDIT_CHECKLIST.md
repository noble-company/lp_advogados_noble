# 🔍 Auditoria Completa de Tracking — LP Advogados

**Data:** 07/02/2026  
**Auditor:** Expert Tracking & Dev Sênior  
**Escopo:** Análise completa da implementação de tracking (GTM, GA4, Meta Pixel, Meta CAPI)

---

## 📋 Sumário Executivo

A implementação de tracking possui uma **arquitetura bem estruturada** com separação em módulos (tracking, tracking-helpers, tracking-init, tracking-constants, tracking-debugger, meta-capi-queue). Porém, existem **redundâncias críticas**, **eventos duplicados**, **gaps de cobertura**, **problemas de performance** e **falhas de segurança** que precisam ser corrigidos para garantir dados confiáveis e não inflacionar métricas.

---

## 🔴 CRÍTICO — Resolver Imediatamente

### C-01: Duplicação massiva de eventos (DOUBLE FIRING)
- **Arquivos:** `src/hooks/useTracking.ts` + `src/lib/tracking.ts`
- **Problema:** O hook `useTracking.ts` chama DUAS vezes cada plataforma. Primeiro chama a função legada (`trackWhatsAppLib`, `trackFormLib`, `trackCalculatorLib`) que internamente usa `trackEvent()` (que dispara GTM + GA4 + Pixel), e DEPOIS chama `trackToAllPlatforms()` que dispara GTM + GA4 + Pixel + CAPI novamente.
- **Impacto:** Cada WhatsApp click, form submit e calculator CTA é disparado **2x no GTM, 2x no GA4, 2x no Pixel**. Isso infla todas as métricas em 100%.
- **Exemplo concreto:**
  ```
  trackWhatsAppClick() no hook:
    1. trackWhatsAppLib() → trackEvent() → trackToGTM + trackToGA4 + trackToMetaPixel  ← 1ª vez
    2. trackToAllPlatforms() → trackToGTM + trackToGA4 + trackToMetaPixel + trackToMetaCAPI  ← 2ª vez
  ```
- **Solução:** Remover as chamadas às funções legadas (`trackWhatsAppLib`, `trackFormLib`, `trackCalculatorLib`) do hook e usar APENAS `trackToAllPlatforms()`.
- [x] **Corrigido** ✅ (07/02/2026) — Removidas chamadas legadas do hook. Eventos críticos (WhatsApp, Form Submit, Calculator CTA) usam apenas `trackToAllPlatforms()`. Eventos leves (form open/close/field_interaction, calculator slider/result, section_view) usam helpers individuais (`trackToGTM`+`trackToGA4`+`trackToMetaPixel`) sem CAPI.

### C-02: Funções duplicadas com mesmo nome em módulos diferentes
- **Arquivos:** `src/lib/tracking.ts` (linhas 131, 147, 166) e `src/lib/tracking-helpers.ts` (linhas 54, 75, 95)
- **Problema:** Existem duas versões de `trackToGTM()`, `trackToGA4()` e `trackToMetaPixel()` — uma em `tracking.ts` e outra em `tracking-helpers.ts` — com assinaturas e comportamentos diferentes.
  - `tracking.ts` → recebe `eventData: Record<string, any>` e NÃO tem logging via debugger
  - `tracking-helpers.ts` → recebe `(eventName, eventData)` separados e TEM logging via `logTracking()`
- **Impacto:** Dependendo de qual módulo é importado, o comportamento muda silenciosamente. Gera confusão e bugs difíceis de rastrear.
- **Solução:** Eliminar as funções de `tracking.ts` e manter apenas as de `tracking-helpers.ts` que já possuem debugging integrado. Redirecionar todos os imports.
- [x] **Corrigido** ✅ (07/02/2026) — Removidas `trackToGTM`, `trackToGA4`, `trackToMetaPixel`, `trackEvent`, `trackWhatsAppClick`, `trackFormEvent`, `trackCalculatorInteraction`, `trackScrollDepth`, `trackSectionView` e `sendToMetaCAPI` de `tracking.ts`. Mantidas apenas: tipos, `generateEventId`, `getMetaCookies`, `trackPageView`. `useScrollDepthTracking` redirecionado para usar helpers de `tracking-helpers.ts`.

### C-03: `sendToMetaCAPI` deprecated mas ainda exporta
- **Arquivo:** `src/lib/tracking.ts` (linha 258)
- **Problema:** Função marcada como `@deprecated` mas continua exportada e utiliza `dynamic import` para fazer lazy-load de `tracking-helpers.ts`. Isso adiciona um await desnecessário e pode falhar silenciosamente.
- **Impacto:** Código morto que adiciona complexidade e pode ser chamado acidentalmente.
- **Solução:** Remover completamente e atualizar qualquer referência remanescente.
- [x] **Corrigido** ✅ (07/02/2026) — Removida junto com C-02. Função `sendToMetaCAPI` eliminada de `tracking.ts`. Único ponto de envio CAPI agora é `trackToMetaCAPI` em `tracking-helpers.ts`.

### C-04: WhatsAppCTAButton NÃO TRACKA nada
- **Arquivo:** `src/components/WhatsAppCTAButton.tsx`
- **Problema:** O componente principal de CTA (usado na Hero, FinalCTA, etc.) apenas chama `openLeadForm()` sem nenhum tracking. Não importa `useTracking`, não dispara nenhum evento.
- **Impacto:** Cliques nos CTAs mais visíveis da página (Hero, Section Final) **não são rastreados**. Impossível medir CTR dos CTAs.
- **Solução:** Adicionar `trackWhatsAppClick` ou `trackSection` no clique, passando `buttonLocation` baseado na prop ou contexto.
- [x] **Corrigido** ✅ (07/02/2026) — Adicionado `useTracking` e `trackWhatsAppClick` ao componente. Clique agora tracka com `buttonLocation: cta_{variant}` e `messageKey` antes de abrir o lead form. Prop `messageKey` agora é usada (default: `"default_cta"`).

### C-05: FloatingCTA não tracka o CLIQUE, apenas a exibição
- **Arquivo:** `src/components/FloatingCTA.tsx` (linha 25)
- **Problema:** O `trackSection("floating_cta_appeared")` rastreia apenas quando o botão flutuante aparece. O `handleClick` na linha 14 apenas chama `openLeadForm()` sem nenhum tracking de clique.
- **Impacto:** Impossível medir taxa de clique no Floating CTA (desktop e mobile).
- **Solução:** Adicionar tracking de clique no `handleClick` com `buttonLocation: "floating_cta"`.
- [x] **Corrigido** ✅ (07/02/2026) — Adicionado `trackWhatsAppClick` no `handleClick` com `buttonLocation: "floating_cta"` e `messageKey: "floating_cta"`. Ambos botões (desktop e mobile) agora disparam tracking completo (GTM + GA4 + Pixel + CAPI).

### C-06: Variável `debugger` usa palavra reservada do JavaScript
- **Arquivo:** `src/lib/tracking-debugger.ts` (linha ~196)
- **Problema:** `const debugger = new TrackingDebugger()` — "debugger" é uma **palavra reservada** do JavaScript. Isso deveria causar um erro de sintaxe. Se funciona, é porque o bundler está fazendo uma transformação, mas é extremamente perigoso.
- **Impacto:** Potencial crash em runtime dependendo do ambiente.
- **Solução:** Renomear para `trackingDebuggerInstance` ou `debuggerInstance`.
- [x] **Corrigido** ✅ (07/02/2026) — Variável renomeada para `trackingDebuggerInstance` e todas as referências atualizadas. Não há mais uso de palavra reservada.

---

## 🟠 ALTO — Resolver em Curto Prazo

### A-01: `field_interaction` disparado a cada keystroke sem debounce
### A-02: `trackEvent()` em `tracking.ts` não envia para CAPI
- **Arquivo:** `src/lib/tracking.ts` (função `trackEvent`, linha 190)
- **Problema:** A função `trackEvent()` envia para GTM, GA4 e Pixel, mas **não envia para Meta CAPI**. Os eventos de scroll depth, section view, e os duplicados do hook ficam sem server-side tracking.
- **Impacto:** Inconsistência entre eventos browser-side e server-side. Scroll depth e section view sem backup server-side.
- **Solução:** Se esses eventos não precisam de CAPI (scroll/section geralmente não), documentar. Se precisam, integrar. O ideal é que `trackEvent` seja depreciado em favor de `trackToAllPlatforms`.
- [x] **Corrigido** ✅ (07/02/2026) — A função `trackEvent` foi removida do projeto. Todo tracking relevante agora utiliza `trackToAllPlatforms`, que já envia para GTM, GA4, Pixel e Meta CAPI. Não há mais risco de eventos importantes ficarem sem backup server-side. Documentação e imports revisados.

### A-03: Scroll listener sem throttle
- **Arquivo:** `src/hooks/useScrollDepthTracking.ts`
- **Problema:** O `handleScroll` é executado a cada pixel de scroll sem nenhum throttle/debounce. Embora o tracking em si tenha proteção de Set, o cálculo roda centenas de vezes por segundo.
- **Impacto:** Performance degradada, especialmente em mobile. Jank de scroll.
- **Solução:** Usar `requestAnimationFrame` ou `throttle` de 200-300ms. Melhor ainda: usar `IntersectionObserver` com sentinelas em cada threshold.
- [ ] **Corrigir**
  - [x] Iniciado: Refatoração para throttle/requestAnimationFrame em andamento (07/02/2026)
  - [x] Concluído: Scroll listener com throttle de 250ms implementado (07/02/2026)

### A-04: FloatingCTA tem scroll listener duplicado com scroll tracking
- **Arquivo:** `src/components/FloatingCTA.tsx` (linha 19)
- **Problema:** Adiciona um segundo event listener de scroll independente do `useScrollDepthTracking`. Dois listeners de scroll rodando simultaneamente.
- **Impacto:** Performance. Deveria usar `IntersectionObserver` ou integrar com o hook existente.
- **Solução:** Substituir por `IntersectionObserver` ou por um hook compartilhado de scroll position.
- [x] Concluído: Substituído por IntersectionObserver (07/02/2026)
- [x] **Corrigido**

### A-05: `type LeadData` definido em 2 lugares diferentes
+ [x] **Corrigido**

### A-06: `VITE_TRACKING_DEBUG` não declado no `vite-env.d.ts`
[x] **Corrigido**

### A-07: UTM params não são enviados na maioria dos eventos de `trackEvent()`
### A-08: Meta CAPI faz fetch direto sem validação de payload
 [x] **Corrigido**

---

## 🟡 MÉDIO — Resolver no Próximo Sprint

### M-01: Arquivo backup esquecido no repositório
- **Arquivo:** `src/hooks/useTracking.ts.backup` (303 linhas)
- **Problema:** Arquivo de backup da versão anterior do hook. Código morto no repositório.
- **Impacto:** Confusão, risco de alguém importar do arquivo errado, peso desnecessário no bundle check.
- **Solução:** Remover do repositório. Histórico está no Git.
- [ ] **Remover**

### M-02: `isGTMConfigured()` verifica `dataLayer` mas mensagem de erro menciona `VITE_GTM_ID`
- **Arquivo:** `src/lib/tracking.ts` (linhas 76-78, 133)
- **Problema:** `isGTMConfigured()` verifica se `window.dataLayer` existe, mas a mensagem de warn diz "VITE_GTM_ID environment variable is missing". São coisas diferentes — o dataLayer pode existir sem GTM via env var (injetado por outro script).
- **Impacto:** Mensagem de debug enganosa.
- **Solução:** Ajustar mensagem ou verificar a env var diretamente.
- [ ] **Corrigir**

### M-03: `trackPageView` duplicado entre `App.tsx` e `tracking-init.ts`
- **Arquivos:** `src/App.tsx` (RouteTracker, linha 18) e `src/lib/tracking-init.ts` (linha 80, `fbq('track', 'PageView')`)
- **Problema:** Na inicialização, o Meta Pixel dispara `PageView`. Depois, o `RouteTracker` dispara `trackPageView()` que envia para GTM e GA4 (mas não Pixel, por design). Porém, em navegações SPA subsequentes, apenas GTM/GA4 recebem page views — o Pixel não.
- **Impacto:** Page views inconsistentes entre plataformas em SPAs multi-page.
- **Solução:** Enviar `fbq('track', 'PageView')` também no `RouteTracker` para rotas subsequentes, com eventID para deduplicação.
- [ ] **Corrigir**

### M-04: Constantes definidas mas não utilizadas
- **Arquivo:** `src/lib/tracking-constants.ts`
- **Problema:** Várias constantes como `MESSAGE_KEYS`, `BUTTON_LOCATIONS`, `FORM_ACTIONS`, `EVENT_CATEGORIES` são definidas mas as chamadas nos componentes usam strings hardcoded. Ex: no hook `trackWhatsAppClick` usa `'Contact'` ao invés de `META_CAPI_EVENT_NAMES.CONTACT` para o Pixel.
- **Impacto:** As constantes existem para padronizar, mas não são usadas consistentemente — reduzindo seu valor e introduzindo risco de typos.
- **Solução:** Refatorar todos os componentes para usar exclusivamente as constantes em vez de strings hardcoded.
- [ ] **Corrigir**

### M-05: `trackToAllPlatforms` retorna `capiPromise` que nunca é tratada
- **Arquivo:** `src/hooks/useTracking.ts`
- **Problema:** `trackToAllPlatforms()` retorna `{ eventId, capiPromise }` mas no hook o retorno não é utilizado em nenhum dos casos (WhatsApp, Form, Calculator). A promise fica órfã.
- **Impacto:** Se o CAPI falha, o erro é logado mas o componente nunca sabe. Em form submits, deveria aguardar ou pelo menos logar.
- **Solução:** No mínimo fazer `.catch()` no retorno. Idealmente, para form submit, aguardar a promise antes de redirecionar.
- [ ] **Avaliar e corrigir**

### M-06: `MetaCAPIEventQueue` instanciada lazy mas constructor chama `startProcessing()`
- **Arquivo:** `src/lib/meta-capi-queue.ts` (linha 36)
- **Problema:** O constructor chama `this.loadFromStorage()` e `this.startProcessing()`. Porém `startProcessing()` não existe no código — provavelmente deveria ser `this.process()`.
- **Impacto:** Potencial erro silencioso. Eventos enfileirados de sessões anteriores podem não ser reprocessados automaticamente.
- **Solução:** Verificar se `startProcessing` existe e, se não, substituir por `this.process()`.
- [ ] **Verificar e corrigir**

### M-07: Nenhum tracking de tempo de permanência (time on page)
- **Problema:** Não há tracking de quanto tempo o usuário permanece na página nem de engagement time por seção.
- **Impacto:** Métricas de engajamento limitadas. GA4 calcula isso internamente, mas GTM/CAPI não recebem esse dado.
- **Solução:** Implementar tracking de `engagement_time` com heartbeat a cada 15-30s ou ao sair da página via `visibilitychange` / `beforeunload`.
- [ ] **Implementar**

### M-08: Tracking de `section_view` não implementado nos componentes
- **Arquivos:** Todos os componentes de seção (`HeroSection`, `PainPointsSection`, `StatsSection`, etc.)
- **Problema:** Existe `trackSectionView()` na lib e `trackSection()` no hook, mas **nenhuma seção da página usa IntersectionObserver ou chama trackSection()**. Apenas o FloatingCTA usa `trackSection` (e erroneamente, para "appeared" e não para "view").
- **Impacto:** Zero dados de visibilidade de seções. Impossível saber quais seções os usuários veem.
- **Solução:** Implementar `IntersectionObserver` em cada seção principal ou criar um hook `useSectionTracking(ref, sectionName)`.
- [ ] **Implementar**

### M-09: Componentes comentados/removidos na Index.tsx
- **Arquivo:** `src/pages/Index.tsx`
- **Problema:** Vários componentes importados (`SolutionPresentationSection`, `HowItWorksSection`, `ROICalculator`, `GuaranteesSection`, `FAQSection`, `FinalCTASection`) são importados mas **não renderizados** no JSX.
- **Impacto:** Dead imports. Mais importante: se `ROICalculator` não é renderizado, todo o tracking de calculadora (slider_change, result_view, cta_click) é código morto.
- **Solução:** Remover imports não utilizados ou restaurar os componentes na renderização.
- [ ] **Corrigir**

---

## 🔵 BAIXO — Melhorias de Qualidade

### B-01: Console.logs de tracking em produção
- **Arquivos:** `src/lib/tracking-init.ts` (linhas 44, 87), `src/lib/meta-capi-queue.ts` (vários)
- **Problema:** `console.log("✅ GTM initialized...")` e `console.log("✅ Meta Pixel initialized...")` rodam em produção. Vários `console.warn` também aparecem em produção.
- **Impacto:** Suja o console do usuário. Informações sensíveis (IDs) expostas.
- **Solução:** Envolver em `if (import.meta.env.DEV)` ou usar o `TrackingDebugger` para todos os logs.
- [ ] **Corrigir**

### B-02: `debugTrackingCall` em `tracking-helpers.ts` é redundante com `TrackingDebugger`
- **Arquivo:** `src/lib/tracking-helpers.ts` (linha 254)
- **Problema:** Existe uma função `debugTrackingCall()` que faz console.group/log, enquanto o `TrackingDebugger` já faz exatamente isso. São dois sistemas de debug paralelos.
- **Impacto:** `debugTrackingCall` nunca é chamada em nenhum lugar do código. Código morto.
- **Solução:** Remover `debugTrackingCall` e usar apenas `logTracking` do `TrackingDebugger`.
- [ ] **Remover**

### B-03: Validadores de evento nunca são usados
- **Arquivo:** `src/lib/tracking-constants.ts` (funções `isValidTrackingEvent`, `isValidMetaCAPIEvent`)
- **Problema:** Funções de validação existem mas nunca são chamadas antes de disparar eventos.
- **Impacto:** Eventos com nomes errados passam silenciosamente. O propósito destas funções não é cumprido.
- **Solução:** Integrar validação nas funções `trackToGTM`, `trackToGA4`, etc. (pelo menos em DEV mode).
- [ ] **Integrar**

### B-04: `getScrollThresholds()` retorna cópia mas thresholds são hardcoded no hook
- **Arquivo:** `src/hooks/useScrollDepthTracking.ts` (linha 29) vs `src/lib/tracking-constants.ts`
- **Problema:** Hook usa `const thresholds = [25, 50, 75, 100]` hardcoded enquanto existe `TRACKING_CONFIG.SCROLL_DEPTH_THRESHOLDS` e `getScrollThresholds()`.
- **Impacto:** Se alguém mudar os thresholds na config, o hook não reflete a mudança.
- **Solução:** Usar `getScrollThresholds()` ou `TRACKING_CONFIG.SCROLL_DEPTH_THRESHOLDS` no hook.
- [ ] **Corrigir**

### B-05: `LeadData` do form submit não envia dados pessoais reais para CAPI
- **Arquivo:** `src/components/LeadCaptureModal.tsx`
- **Problema:** O `trackFormEvent("submit", ...)` passa `company_size`, `daily_services`, `has_instagram`, mas NÃO passa `email`, `phone`, `name`. O hook em `useTracking.ts` tenta acessar `formData.email`, `formData.phone`, etc., mas esses campos não existem no objeto passado pelo `LeadCaptureModal`.
- **Impacto:** Meta CAPI recebe leads sem dados de matching (email, phone). Advanced Matching do Meta fica inutilizado. Qualidade do público/lookalike cai drasticamente.
- **Solução:** Passar `email`, `phone`, `name`, `instagram` no `formData` do `trackFormEvent`.
- [ ] **Corrigir**

### B-06: Sem tratamento de consent/LGPD
- **Problema:** Nenhum banner de cookies/consentimento. GTM, Pixel e CAPI são inicializados incondicionalmente em `main.tsx`.
- **Impacto:** Violação potencial da LGPD. Risco legal para o cliente.
- **Solução:** Implementar banner de consentimento. Condicionar `initTracking()` à aceitação do usuário. Implementar consent mode v2 do Google.
- [ ] **Implementar**

### B-07: Sem testes de tracking
- **Arquivo:** `src/test/example.test.ts`
- **Problema:** Existe apenas um teste de exemplo. Nenhum teste para as funções de tracking, hooks, ou queue.
- **Impacto:** Qualquer refatoração pode quebrar tracking silenciosamente sem detecção.
- **Solução:** Criar testes unitários pelo menos para: `generateEventId`, `getMetaCookies`, `trackToAllPlatforms`, `useTracking` hook, `MetaCAPIEventQueue`.
- [ ] **Implementar**

### B-08: `saveToStorage()` da Queue é private mas chamada no `visibilitychange`
- **Arquivo:** `src/lib/meta-capi-queue.ts` (linha ~296)
- **Problema:** O evento `visibilitychange` tenta chamar `queueInstance?.saveToStorage()`, mas `saveToStorage` é um método private da classe.
- **Impacto:** Erro de TypeScript ignorado. O save no visibility change pode não funcionar.
- **Solução:** Criar um método public `flush()` que chama `saveToStorage()` internamente.
- [ ] **Corrigir**

### B-09: Sem tracking de erros/exceptions
- **Problema:** Nenhum tracking de erros JavaScript ou de tracking falhos para GTM/GA4.
- **Impacto:** Se o site quebra, nenhuma plataforma analítica registra o erro.
- **Solução:** Implementar `window.onerror` e `unhandledrejection` com envio para GTM/GA4 como evento `exception`.
- [ ] **Implementar**

### B-10: ConversionForm tem tracking mas não é mais usado
- **Arquivo:** `src/components/ConversionForm.tsx`
- **Problema:** O componente `ConversionForm` não é importado/renderizado em nenhum lugar da aplicação (não aparece em `Index.tsx` nem `App.tsx`). Foi substituído por `LeadCaptureModal`.
- **Impacto:** Código morto com tracking que nunca será acionado.
- **Solução:** Remover o componente ou documentar se é para uso futuro.
- [ ] **Avaliar e remover**

---

## 📊 Matriz de Impacto vs Esforço

| ID | Issue | Impacto nos Dados | Esforço | Prioridade |
|------|-------|-------------------|---------|------------|
| C-01 | Double firing de eventos | 🔴 Crítico | Baixo | P0 |
| C-02 | Funções duplicadas em módulos | 🔴 Crítico | Médio | P0 |
| C-04 | WhatsAppCTAButton sem tracking | 🔴 Crítico | Baixo | P0 |
| C-05 | FloatingCTA sem tracking de clique | 🔴 Crítico | Baixo | P0 |
| C-06 | Palavra reservada `debugger` | 🔴 Crítico | Baixo | P0 |
| C-03 | `sendToMetaCAPI` deprecated | 🟠 Alto | Baixo | P1 |
| A-01 | field_interaction sem debounce | 🟠 Alto | Baixo | P1 |
| A-03 | Scroll sem throttle | 🟠 Alto | Baixo | P1 |
| A-08 | CAPI sem validação de payload | 🟠 Alto | Médio | P1 |
| B-05 | LeadData sem dados pessoais reais | 🟠 Alto | Baixo | P1 |
| B-06 | Sem LGPD/consent | 🟠 Alto | Alto | P1 |
| A-07 | UTM faltando em scroll/section | 🟡 Médio | Baixo | P2 |
| M-04 | Constantes não utilizadas | 🟡 Médio | Médio | P2 |
| M-08 | Section view não implementado | 🟡 Médio | Médio | P2 |
| M-09 | Componentes importados não renderizados | 🟡 Médio | Baixo | P2 |
| M-01 | Arquivo .backup | 🔵 Baixo | Baixo | P3 |
| B-01 | Console.logs em produção | 🔵 Baixo | Baixo | P3 |
| B-07 | Sem testes | 🔵 Baixo | Alto | P3 |

---

## 🏗️ Arquitetura Atual vs Recomendada

### Atual (Problemática)
```
Componente
  └→ useTracking() hook
       ├→ trackWhatsAppLib() → trackEvent() → GTM + GA4 + Pixel  ← DISPARO 1
       └→ trackToAllPlatforms() → GTM + GA4 + Pixel + CAPI       ← DISPARO 2 (DUPLICADO)
```

### Recomendada
```
Componente
  └→ useTracking() hook
       └→ trackToAllPlatforms()
            ├→ trackToGTM()       (tracking-helpers.ts)
            ├→ trackToGA4()       (tracking-helpers.ts)
            ├→ trackToMetaPixel() (tracking-helpers.ts)
            └→ trackToMetaCAPI()  (tracking-helpers.ts) → MetaCAPIEventQueue
```

### Módulos a depreciar/remover:
- `tracking.ts` → funções `trackToGTM`, `trackToGA4`, `trackToMetaPixel`, `trackEvent`, `sendToMetaCAPI`
- `tracking.ts` → manter APENAS: `generateEventId`, `getMetaCookies`, tipos exportados
- Mover tipos para `tracking-constants.ts`

---

## 📈 Fluxo de Dados — Gaps Identificados

| Evento | GTM | GA4 | Pixel | CAPI | Status |
|--------|-----|-----|-------|------|--------|
| Page View | ✅ | ✅ | ✅ (init only) | ❌ | ⚠️ SPA navigation sem Pixel |
| WhatsApp Click | ✅✅ | ✅✅ | ✅✅ | ✅ | 🔴 DUPLICADO |
| Form Open | ✅✅ | ✅✅ | ✅✅ | ❌ | 🔴 DUPLICADO, sem CAPI |
| Form Submit | ✅✅ | ✅✅ | ✅✅ | ✅ | 🔴 DUPLICADO |
| Form Close | ✅ | ✅ | ✅ | ❌ | ✅ OK (só 1x) |
| Field Interaction | ✅🔥 | ✅🔥 | ✅🔥 | ❌ | 🔴 FLOOD sem debounce |
| Calculator Slider | ✅ | ✅ | ✅ | ❌ | ✅ OK |
| Calculator CTA | ✅✅ | ✅✅ | ✅✅ | ✅ | 🔴 DUPLICADO |
| Scroll Depth | ✅ | ✅ | ✅ | ❌ | ⚠️ Sem throttle |
| Section View | ✅ | ✅ | ✅ | ❌ | ❌ NÃO IMPLEMENTADO |
| CTA Button Click | ❌ | ❌ | ❌ | ❌ | ❌ NÃO IMPLEMENTADO |
| Floating CTA Click | ❌ | ❌ | ❌ | ❌ | ❌ NÃO IMPLEMENTADO |
| Time on Page | ❌ | ❌ | ❌ | ❌ | ❌ NÃO IMPLEMENTADO |
| JS Errors | ❌ | ❌ | ❌ | ❌ | ❌ NÃO IMPLEMENTADO |

---

## ✅ Pontos Positivos da Implementação Atual

1. **Event ID para deduplicação Pixel-CAPI** — Bem implementado com `generateEventId()`.
2. **Meta CAPI Queue com retry** — Excelente padrão de resiliência com exponential backoff e localStorage persistence.
3. **Tracking Debugger** — Ferramenta de debug sofisticada com export, filtering e summary. Boa ideia expor via `window.__TRACKING_DEBUG__`.
4. **UTM persistence** — Implementação robusta com fallback in-memory, tratamento de localStorage indisponível, e expiração configurável.
5. **Separação de concerns** — Boa tentativa de modularização (constants, helpers, init, debugger, queue).
6. **Type-safety parcial** — Tipos definidos para eventos e configurações.
7. **Constantes centralizadas** — `tracking-constants.ts` é um bom single source of truth (apesar de não ser utilizado plenamente).

---

## 🎯 Recomendação de Ordem de Execução

### Sprint 1 — Parar o Sangramento (1-2 dias)
1. [ ] **C-01** — Eliminar double firing (maior impacto imediato nos dados)
2. [ ] **C-02** — Unificar funções duplicadas
3. [ ] **C-04** — Adicionar tracking ao WhatsAppCTAButton
4. [ ] **C-05** — Adicionar tracking de clique ao FloatingCTA
5. [ ] **C-06** — Renomear variável `debugger`

### Sprint 2 — Qualidade dos Dados (2-3 dias)
6. [ ] **A-01** — Debounce em field_interaction
7. [ ] **A-03** — Throttle/IntersectionObserver no scroll
8. [ ] **B-05** — Enviar dados pessoais corretos para CAPI
9. [ ] **A-08** — Validação de payload CAPI
10. [ ] **M-09** — Resolver componentes não renderizados

### Sprint 3 — Cobertura Completa (3-4 dias)
11. [ ] **M-08** — Implementar section view tracking com IntersectionObserver
12. [ ] **M-03** — Page view consistente em SPA navigation
13. [ ] **A-07** — UTM params em todos os eventos
14. [ ] **M-04** — Usar constantes em todos os componentes
15. [ ] **C-03** — Remover código deprecated

### Sprint 4 — Compliance e Robustez (4-5 dias)
16. [ ] **B-06** — Banner LGPD + Consent Mode v2
17. [ ] **B-07** — Testes unitários de tracking
18. [ ] **B-09** — Error tracking
19. [ ] **M-07** — Time on page tracking
20. [ ] Limpeza geral (B-01, B-02, B-03, B-04, M-01, B-08, B-10)

---

## 📝 Notas Finais

- **Dados atuais não são confiáveis** — O double firing (C-01) significa que TODOS os números de WhatsApp clicks, form submits e calculator CTAs estão inflados em ~2x nas plataformas GA4, GTM e Pixel. Meta CAPI é o único com contagem correta.
- **Antes de qualquer otimização de campanha**, o C-01 deve ser resolvido. Caso contrário, decisões de budget estarão baseadas em dados inflados.
- **O .env com credenciais** está commitado no repositório. Verificar se o `.gitignore` inclui `.env` para não expor IDs de GTM e Pixel.
