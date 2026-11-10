# LocalPal Phase 1 修改文件与备份记录

所有源码提交均在 `feat/localpal-phase1-rebuild`，main 保持原基线，未使用 force push。每次推送后使用 `git ls-remote` 核对远程 SHA。

Batch 3 的角色验证与 Batch 4 的 Markdown 合并在一次备份提交中，未改写远程历史。以下列出本次最终文档补全之前的全部提交；本次补全只修改本文件与 `LOCALPAL_PHASE1_REBUILD.md`，不改应用源码。

## docs: record LocalPal phase 1 baseline and delivery plan

提交：`44a8bfbccb59246f48c87a5b655bb29357f23553`

- `docs/LOCALPAL_PHASE1_REBUILD.md`

## feat: rebuild LocalPal chat navigation and model dropdown

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

## feat: integrate local model management into LocalPal settings

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

## feat: render standalone italic Markdown paragraphs in secondary text

提交：`abd51283444373a6b959f95370de70f616dcf4c0`

- `docs/LOCALPAL_PHASE1_REBUILD.md`
- `src/components/MarkdownView/MarkdownProvider.tsx`
- `src/components/MarkdownView/MarkdownView.tsx`
- `src/components/MarkdownView/__tests__/MarkdownView.test.tsx`
- `src/components/MarkdownView/__tests__/renderMarkdown.test.ts`
- `src/components/MarkdownView/renderMarkdown.ts`
- `src/components/__tests__/PersonaSettingsSheet.test.tsx`

## fix: support local Android builds and verify phase 1 regression

提交：`a0cbad927d80b03b049c677c6e232fcfd8e2a3df`

- `__tests__/App.test.tsx`
- `android/app/build.gradle`
- `docs/LOCALPAL_PHASE1_FILES.md`
- `docs/LOCALPAL_PHASE1_REBUILD.md`

## fix: preserve floating composer backgrounds and record Android checks

提交：`9a94a490062e26400458999d0f4482a221df34b7`

- `docs/LOCALPAL_ANDROID_ACCEPTANCE.md`
- `docs/LOCALPAL_PHASE1_REBUILD.md`
- `docs/LOCALPAL_PHASE1_REQUEST.md`
- `src/components/ChatInput/ChatInput.tsx`
- `src/components/ChatView/ChatView.tsx`
- `src/screens/ModelsScreen/ModelCard/styles.ts`

## chore: record Android build controls and navigation verification

提交：`bcc4f27bbe739e16ccf7b0efcb3eb39e8e89a29c`

- `App.tsx`
- `README.md`
- `docs/LOCALPAL_PHASE1_REBUILD.md`
- `scripts/localpal-android-build.init.gradle`
- `src/components/MarkdownView/__tests__/renderMarkdown.test.ts`

## fix: preserve the full native payload in constrained Android builds

提交：`f4d07e1c41b9178666b8abb412ba18c0abf27d2e`

- `docs/LOCALPAL_PHASE1_REBUILD.md`
- `scripts/localpal-android-build.init.gradle`

## fix: hide deferred voice and Plus controls in LocalPal

提交：`6c3113d6fa3ab0846f4706136a9c5bc647c01d30`

- `App.tsx`
- `__tests__/App.test.tsx`
- `docs/LOCALPAL_PHASE1_REBUILD.md`
- `src/components/AssistantTurnFooter/AssistantTurnFooter.tsx`
- `src/components/AssistantTurnFooter/__tests__/AssistantTurnFooter.localOnly.test.tsx`
- `src/components/ChatInput/ChatInput.tsx`
- `src/components/ChatInput/__tests__/ChatInput.test.tsx`
- `src/components/ChatView/ChatView.tsx`
- `src/components/Message/Message.tsx`
- `src/screens/ChatScreen/ChatScreen.tsx`
- `src/screens/ChatScreen/VideoPalScreen.tsx`

## fix: suppress saved auto-speak in the local chat flow

提交：`3b935575b661c21cfbf58983e0aabd2de7171c25`

- `docs/LOCALPAL_PHASE1_FILES.md`
- `docs/LOCALPAL_PHASE1_REBUILD.md`
- `src/hooks/__tests__/useChatSession.test.ts`
- `src/hooks/useChatSession.ts`
- `src/screens/ChatScreen/ChatScreen.tsx`

## chore: document intentional LocalPal model card token adoption

提交：`ac8fa3a5e4e6f980c5a6ea68bbfb0fd8c22595ec`

- `docs/LOCALPAL_PHASE1_REBUILD.md`
- `docs/LOCALPAL_UI_ARCHITECTURE.md`
- `src/theme/tokens/__tests__/invariants.test.ts`
