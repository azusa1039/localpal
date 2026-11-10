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
| 0 | Baseline, environment, feature branch, remote backup | Branch backed up; clean regression running |
| 1 | Chat shell, drawer, composer, model dropdown, overflow | Implemented; native visual acceptance pending |
| 2 | Settings and local model management integration | Pending |
| 3 | Existing streaming, history, personas, generation and import/export | Pending |
| 4 | Markdown and standalone italic paragraphs | Pending |
| 5 | Regression, JS bundle, APK and device acceptance | Pending |

## Validation record

Baseline TypeScript passed. Baseline ESLint passed with 46 existing warnings.
The first full Jest run overlapped source edits and is not treated as a pristine
baseline (436 suites passed; 5 failed from changed UI contracts, a new locale
section and unavailable Ruby). A clean detached worktree at the base SHA is
running the original tests separately, with a temporary local Ruby runtime.

### Batch 1 — chat shell

- Files: `ChatHeader/styles.ts`, `ChatHeaderTitle/*`, `HeaderRight/*`,
  `SidebarContent/*`, `ChatInput/styles.ts`, `ChatView/styles.ts`,
  `ChatEmptyPlaceholder/ChatEmptyPlaceholder.tsx`, `PersonaSettingsSheet.tsx`,
  Android `strings.xml`, English labels and corresponding locale tests.
- Chat header model dropdown lists installed local models and calls
  `ModelStore.selectModel`. Loading status and an always-available model
  management action are shown; switching is disabled during generation/loading.
- Drawer: LocalPal, new chat, grouped local history, fixed settings footer.
  Rename/delete/pin/bulk export remain on the existing history implementation.
- Overflow: generation settings, personalization, existing conversation
  operations, import/export. Duplicate model submenu removed.
- Composer uses a floating rounded field; decorative empty-state logo removed.
- Focused chat/drawer/locale checks: 6 suites, 144 tests passed using
  `jest --runInBand --coverage=false`. Focused runs disable the global coverage
  threshold; full regression retains the repository coverage requirements.
- TypeScript passed; ESLint passed with the same 46 pre-existing warnings.
- Native screenshot acceptance is pending the Android runtime setup.

The image is a layout reference, not proof of a running LocalPal build. Device
screenshots, APK installation and local model inference require an actual
Android runtime; these will only be marked verified when executed.
