# LocalPal Phase 1 rebuild

## Scope and baseline

- Request: GPT Android style navigation and chat, local model management,
  existing local streaming/history/personas, and standalone italic paragraphs.
- Reference: user's annotated screenshot and Phase 1 plan supplied 2026-11-10.
- Base: `77847397085de7af31d23c32e26d7c9aaaecea1e` (remote `main`).
- Branch: `feat/localpal-phase1-rebuild`; main is unchanged.
- Stack: React Native 0.87.1, React 19.2.3, TypeScript 5.9.3, llama.rn
  0.13.0-rc.9. Dependencies and native inference architecture are retained.
- Reuse: `ModelStore.selectModel`, `useChatSession`, WatermelonDB
  `ChatSessionRepository`, `PalStore`/`setActivePal`, existing generation and
  model settings sheets, GGUF import/download, vision projection settings.
- No database schema, model format, or inference parameter changes are planned.

## Batch tracking

| Batch | Scope | Status |
| --- | --- | --- |
| 0 | Baseline, environment, feature branch, remote backup | In progress |
| 1 | Chat shell, drawer, composer, model dropdown, overflow | Pending |
| 2 | Settings and local model management integration | Pending |
| 3 | Existing streaming, history, personas, generation and import/export | Pending |
| 4 | Markdown and standalone italic paragraphs | Pending |
| 5 | Regression, JS bundle, APK and device acceptance | Pending |

## Validation record

Baseline TypeScript, ESLint and full Jest commands were started before source
changes. Results and batch file lists will be added as checks finish.

The image is a layout reference, not proof of a running LocalPal build. Device
screenshots, APK installation and local model inference require an actual
Android runtime; these will only be marked verified when executed.
