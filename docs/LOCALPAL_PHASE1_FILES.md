# LocalPal Phase 1 修改文件与备份记录

所有提交均在 `feat/localpal-phase1-rebuild`，未修改 main，未使用 force push。

每次推送后均使用 `git ls-remote` 核对远程 SHA。Batch 3 的角色验证测试与 Batch 4 的 Markdown 代码合并在一次备份提交中；没有改写远程历史。

## Batch 0

提交：`44a8bfbccb59246f48c87a5b655bb29357f23553`

- `docs/LOCALPAL_PHASE1_REBUILD.md`

## Batch 1

提交：`e18fdb49d5dd941b0cc3f31d34efd54431b6936c`

- `android/app/src/main/res/values/strings.xml`
- `docs/LOCALPAL_PHASE1_REBUILD.md`
- `src/components/ChatEmptyPlaceholder/ChatEmptyPlaceholder.tsx`
- `src/components/ChatHeader/styles.ts`
- `src/components/ChatHeaderTitle/ChatHeaderTitle.tsx`
- `src/components/ChatHeaderTitle/__tests__/ChatHeaderTitle.test.tsx`
- `src/components/ChatHeaderTitle/styles.ts`
- `src/components/ChatInput/styles.ts`
- `src/components/ChatView/styles.ts`
- `src/components/HeaderRight/HeaderRight.tsx`
- `src/components/HeaderRight/__tests__/HeaderRight.test.tsx`
- `src/components/PersonaSettingsSheet.tsx`
- `src/components/SidebarContent/SidebarContent.tsx`
- `src/components/SidebarContent/__tests__/SidebarContent.plus.test.tsx`
- `src/components/SidebarContent/__tests__/SidebarContent.test.tsx`
- `src/components/SidebarContent/styles.ts`
- `src/locales/__tests__/locales.test.ts`
- `src/locales/en.json`

## Batch 2

提交：`2893ba4de3a12ff9e6e3985f09c1494065dbd733`

- `App.tsx`
- `docs/LOCALPAL_PHASE1_REBUILD.md`
- `src/components/HeaderLeft/HeaderLeft.tsx`
- `src/screens/ModelsScreen/FABGroup/FABGroup.tsx`
- `src/screens/ModelsScreen/FABGroup/__tests__/FABGroup.test.tsx`
- `src/screens/ModelsScreen/ModelCard/styles.ts`
- `src/screens/ModelsScreen/ModelsScreen.tsx`
- `src/screens/SettingsScreen/SettingsHomeScreen.tsx`
- `src/screens/SettingsScreen/SettingsScreen.tsx`
- `src/screens/SettingsScreen/__tests__/SettingsHomeScreen.test.tsx`
- `src/screens/SettingsScreen/__tests__/SettingsScreen.test.tsx`
- `src/screens/SettingsScreen/index.ts`
- `src/utils/navigationConstants.ts`

## Batch 3 / Batch 4

提交：`abd51283444373a6b959f95370de70f616dcf4c0`

- `docs/LOCALPAL_PHASE1_REBUILD.md`
- `src/components/MarkdownView/MarkdownProvider.tsx`
- `src/components/MarkdownView/MarkdownView.tsx`
- `src/components/MarkdownView/__tests__/MarkdownView.test.tsx`
- `src/components/MarkdownView/__tests__/renderMarkdown.test.ts`
- `src/components/MarkdownView/renderMarkdown.ts`
- `src/components/__tests__/PersonaSettingsSheet.test.tsx`
