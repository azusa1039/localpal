# LocalPal Phase 1 UI architecture

The user explicitly requested a visible Android restyle. The existing theme,
Paper components, Menu and Sheet remain the shared design system; there is no
parallel theme provider or new store.

- Surfaces and text use the existing semantic `theme.colors` values, including
  `background`, `surface`, `onSurface`, `onSurfaceVariant`, and `outlineVariant`.
  Dark mode uses the same components and existing UIStore preference.
- Text uses Paper variants and the existing font configuration. The header has
  a single-line title and smaller model line; history has compact date groups.
- Header icons use a 40 dp container. Chat controls reuse the existing icon set.
  Menu and Sheet preserve their original dismissal and accessibility behavior.
- Settings use a 16 dp content inset. Model cards use 12 dp horizontal / 6 dp
  vertical margins, a hairline outline and **`theme.radius.l` (20 dp)**.
- The floating composer has a transparent outer wrapper. Its rounded inner
  surface owns the background, retaining persona colors without rectangular
  corners. Existing send/stop/attachment behavior remains in ChatInput.
- Standalone italic Markdown paragraphs use #6B7280 (light) / #9CA3AF (dark).
  The parser annotates complete top-level emphasis paragraphs; source Markdown
  and inline emphasis are unchanged.

## Token migration boundary

`src/theme/tokens/__tests__/invariants.test.ts` originally protects a foundation
slice from accidental visible token adoption. LocalPal intentionally adopts
Radius/L in **only** `screens/ModelsScreen/ModelCard/styles.ts`; that exact file
is added to the allow-list. The general invariant remains active for all other
production consumers. This is a documented restyle, not a broad token migration.

## Business boundary

Navigation points into the original ModelStore, ChatSessionStore, PalStore and
repositories. Model formats, storage schemas and native inference are retained.
The LocalPal app supplies local-only / speech-disabled presentation flags, while
shared components retain their original defaults for other callers. Speech
disablement also gates reply playback, preserving saved preferences.
