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
| 2 | Settings and local model management integration | Implemented; device inference pending |
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

### Batch 2 — settings and model management

- Files: `App.tsx`, `HeaderLeft/HeaderLeft.tsx`, `navigationConstants.ts`,
  `SettingsScreen/{SettingsHomeScreen.tsx,SettingsScreen.tsx,index.ts}`,
  `ModelsScreen/{ModelsScreen.tsx,ModelCard/styles.ts,FABGroup/FABGroup.tsx}`,
  and focused settings/FAB tests.
- New settings home has local models, personalization, appearance/language,
  and advanced settings. Subpages have explicit back buttons.
- LocalPal starts directly in chat after data hydration/migration; the upstream
  cloud/voice onboarding is not part of the new entry flow.
- In this flow, advanced settings hide voice, purchases, accounts, cloud search
  and the API server; model management hides remote-model/server actions.
  Existing components retain their upstream defaults for other callers/tests.
- Existing GGUF import, download progress, loading/unloading, deletion, generation
  parameters, multimodal vision toggles and projection selection are retained.
- Validation: 7 suites / 178 tests passed (`--coverage=false`), including
  model cards, models screen, model settings, projection selector and settings.
- Native build setup: SDK 37.0, build-tools 37.0.0, NDK 27.3.13750724 and
  CMake 3.22.1 installed outside the repository. Initial Gradle build identified
  a missing Java 17 toolchain; Java 17 setup is in progress. No dependency or
  Android inference source changes were made to work around the environment.
