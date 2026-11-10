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
| 3 | Existing streaming, history, personas, generation and import/export | Integration tests passed; device persistence pending |
| 4 | Markdown and standalone italic paragraphs | Implemented; parser and light/dark rendering tests passed |
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

### Batch 3 — chat and personalization integration

- New file: `src/components/__tests__/PersonaSettingsSheet.test.tsx`.
- The persona selector uses `ChatSessionStore.setActivePal`; existing dialogs
  use `PalSheet`, `PalStore.createPal`/`updatePal` and the existing repositories.
  No additional persona store or cross-session memory layer was introduced.
- Focused validation: 6 suites / 141 tests passed, covering selection/clearing,
  original editor data, persistence failures, real system-prompt construction,
  stopping generation, persona parameter resolution, generation settings and
  export/import roundtrips.
- Existing `useChatSession` streaming and repository data formats are unchanged.
  Process-restart persistence and actual model generation remain device checks.

### Batch 4 — Markdown

- Files: `MarkdownView/{renderMarkdown.ts,MarkdownView.tsx,MarkdownProvider.tsx}`
  and `MarkdownView/__tests__/{renderMarkdown.test.ts,MarkdownView.test.tsx}`.
- A dedicated Marked instance annotates only complete top-level paragraphs
  containing one emphasis token. Original Markdown is not changed. Rendering
  retains the paragraph and emphasis structure and preserves reference links.
- `standalone-italic` is styled by the existing HTML render provider with
  `#6B7280` in light mode and `#9CA3AF` in dark mode, retaining italics.
- Inline emphasis, headings, lists, quotes, fenced code, ordinary text and
  incomplete streaming emphasis do not receive the secondary color.
- Validation: 2 suites / 37 tests passed, including actual rendered light/dark
  text styles, table/code rendering, reference links and streaming transitions.

## Regression and build follow-up

- `yarn typecheck` passed; `yarn lint` passed with the original 46 warnings.
- First complete implementation regression: 442 suites passed, 1 suite failed;
  9,368 tests passed, 2 skipped, 1 stale assertion failed. All 310 snapshots passed.
  The failed hydration assertion expected a drawer Models destination removed by
  the requested navigation design. It now checks the new-chat entry instead.
- App + previously transient upstream HubRunSheetHost checks: 2 suites / 14 tests
  passed. A final complete regression is running with the corrected assertion.
- Clean baseline worktree run was terminated with exit 137 after 401 suite results
  under the environment's 8 GiB memory limit. It is not recorded as a passing
  baseline. One HubRunSheetHost timing failure in that run passed on focused retry.
- Java 17 is installed alongside Java 21 outside the repository. The native build
  also requires the speech dependency's NDK 28.2.13676358, which Gradle is fetching.
- Local Android builds now apply Google Services only when a real configuration
  file exists. Local chat does not require Firebase credentials. Existing cloud
  benchmark builds with configuration retain their original plugin behavior.
- The initial separate Metro bundle was interrupted after memory pressure; a
  fresh bundle/build will be verified before claiming success.
- Full changed-file and verified remote-backup SHAs: `LOCALPAL_PHASE1_FILES.md`.

### Final automated regression

- `yarn test --runInBand`: **444 suites passed; 9,374 tests passed; 2 skipped;
  310 snapshots passed**, exit 0, 243.08 seconds. The repository's global
  coverage thresholds remain enabled. Run with a 3 GiB Node heap limit to
  fit alongside the native build in this 8 GiB environment.
- `yarn typecheck`: passed (50.21 seconds).
- `yarn lint`: passed, 0 errors and 46 existing warnings (60.86 seconds).
- Additional changed-test lint: passed.
- Source implementation and all automated regression checks are complete;
  native build, emulator screenshots and physical-device acceptance remain open.

### Android bundle verification

- Production-mode Android JS bundle passed using the repository's `.nvmrc`
  Node 22.21.0, a 5 GiB Node heap, one Metro worker and `--minify false`
  (the same minification mode used by the existing Hermes release task).
- Bundle: `/workspace/localpal-artifacts/index.android.bundle`; 48 assets copied.
- SHA256: `b58501ba73bb1410ca23199492ab3204085c39286334c9efeed11942d32e07ac`.
- The earlier Node 24 attempts with 2/3 GiB heaps failed with V8 heap exhaustion.
  No application dependencies were upgraded to resolve this.
- APK build now uses Node 22, one Gradle/Metro worker and temporary CMake job
  pools to fit the environment. Resource limits are outside source; native
  inference settings and model data are unchanged.
- Emulator tools and an Android 11 x86_64 AVD are installed. The emulator connected
  to ADB, but was stopped before app installation to release build memory.
  This is not counted as application runtime verification.

### Composer visual follow-up

- Moved the background from the outer composer wrapper to the rounded input
  itself, keeping persona background colors and the floating outline visible.
  Model cards now use the existing `theme.radius.l` token.
- Focused input/chat/model-card regression: 3 suites / 121 tests passed.
  Changed-file ESLint passed with no new warnings. Final TypeScript check passed
  using Node 22.21.0 (13.26 seconds).
- The production-mode JS bundle was regenerated successfully after this polish.
- Android runtime acceptance steps: `LOCALPAL_ANDROID_ACCEPTANCE.md`.
  Original user plan: `LOCALPAL_PHASE1_REQUEST.md`.

### Android navigation follow-up

- Drawer navigation now uses history for Android back behavior, so returning
  from model management/advanced settings follows the visited settings route.
- App/sidebar checks: 2 suites / 24 tests passed; changed-file ESLint passed.
- Android native compilation has started for arm64-v8a and x86_64. APK installation,
  screenshots and local model inference are still pending.

### Final source checks after navigation changes

- Node 22 `yarn typecheck`: passed (16.61 seconds).
- Node 22 `yarn lint`: passed, 0 errors / 46 existing warnings (43.23 seconds).
- Added a long Markdown reply regression with 500 ordinary/italic paragraph pairs
  and a fenced code block; the final Markdown suites passed: 2 suites / 38 tests.

### Reproducing the constrained Android build

An optional portable init script records the resource controls proven during
this build: `scripts/localpal-android-build.init.gradle`. With Node 22.21.0
on PATH, Java 17 and Android SDK installed, run from `android/`:

```sh
./gradlew assembleProdRelease --no-daemon --max-workers=1 \
  --init-script ../scripts/localpal-android-build.init.gradle
```

This changes build-time worker/heap limits only, and retains existing runtime
model/inference settings. Release builds without a private signing key keep the
upstream debug-signing fallback and should be treated as test APKs.
