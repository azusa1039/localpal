# LocalPal Phase 1 开发与验收报告

## 当前结论

源码改造已实现并持续推送到 `feat/localpal-phase1-rebuild`。当前仍是待运行验收的候选版本，**不能据此认定 Phase 1 全部完成**。

| 项目 | 当前状态 |
| --- | --- |
| 原始基线 | 完整测试通过 |
| 聊天、侧栏、模型下拉、三点菜单 | 已实现，待 APK 界面检查 |
| 设置、模型管理与角色编辑整合 | 已实现，待设备操作检查 |
| Markdown 与独立斜体颜色 | 解析与深浅色渲染测试通过，待原生截图 |
| TypeScript / ESLint | 类型检查通过；lint 0 错误，46 项原有警告 |
| 最终完整 Jest | 445 组 / 9,379 项通过，2 项跳过，310 个快照通过 |
| Android APK | 构建、签名、完整原生负载验证通过；模拟器安装返回 Success |
| 模拟器安装、截图、重启后历史 | 安装成功且已发送启动命令；完整界面和重启持久化验收未完成 |
| 实际模型加载、流式生成与停止 | 按用户选择留到真机验收；尚未实测 |
| Android 真机安装与截图 | 待执行；当前没有连接的实体设备 |

## 范围与实现

- 参考用户 2026-11-10 提供的标注截图和原始计划，完整请求保存在 `LOCALPAL_PHASE1_REQUEST.md`。
- 原始基线 / remote main：`77847397085de7af31d23c32e26d7c9aaaecea1e`。
- React Native 0.87.1、React 19.2.3、TypeScript 5.9.3、llama.rn 0.13.0-rc.9 保持原有版本。
- 未修改数据库 schema、模型格式、原生推理源代码或推理参数语义。
- UI 规范和边界见 `LOCALPAL_UI_ARCHITECTURE.md`；运行验收步骤见 `LOCALPAL_ANDROID_ACCEPTANCE.md`。

### Batch 0：基线与备份

创建独立分支，main 保持不变。每次推送后用 `git ls-remote` 核对远程 SHA；未使用 force push、reset 或 clean。逐提交文件清单见 `LOCALPAL_PHASE1_FILES.md`。

在原始 SHA 的独立只读基线 worktree 完成完整回归：**441 组 / 9,350 项测试通过，2 项跳过，310 个快照通过**，exit 0，677.60 秒。使用 Node 22 与临时 Ruby 运行时。

此前一次基线测试与源码编辑重叠，不作为原始基线证据；另一次因 8 GiB 环境内存压力以 exit 137 结束，也未记录为通过。上述成功的独立基线运行替代这两次无效结果。

### Batch 1：GPT 风格聊天导航

- 顶部侧栏入口、当前标题、模型名称/加载状态、新建聊天与三点菜单。
- 模型下拉列出已安装本地模型，实际调用并等待 `ModelStore.selectModel`；加载和生成期间禁止切换，异常有提示。无模型时仍可进入模型管理。
- LocalPal 侧栏保留新聊天、按日期分组的本地历史、原有标题/固定/删除/多选/导出管理和底部设置。
- 三点菜单整合原有生成参数、个性化、重命名、复制、删除、导入与导出，移除重复模型子菜单。
- 浮动圆角输入区保留文字发送/停止/附件；透明外层与有背景的圆角内层避免方形底色，保留角色背景色。
- 移除装饰性空白页 Logo 和不需要的通用问候，不加入项目、插件、资料库、定时任务等空壳入口。
- Android 显示名为 LocalPal；内部包名仍为 `com.pocketpalai`，避免破坏原有安装与数据身份。
- 初期针对性验证：6 组 / 144 项测试通过。

### Batch 2：设置与本地模型管理

设置首页整合本地模型、个性化、深浅色、语言与更多设置。模型和高级设置页有明确返回路径；Android 返回键使用 drawer history。

LocalPal 的入口通过 `localOnly` 复用原页面，隐藏 Plus、语音、账户、云搜索、API 服务及远程模型入口。保留 GGUF 下载/导入、进度与大小、加载/卸载/删除、模型参数、视觉投影模型配置及原有文件管理逻辑。

模型卡片统一边框、边距与 Radius/L。主题变量的架构检查只允许这一个明确改版文件，未放宽为全局规则。

针对性验证：7 组 / 178 项测试通过，包含模型卡片、参数、投影模型、设置与 FAB。

### Batch 3：聊天、历史与角色

- 继续使用 `useChatSession`、WatermelonDB / `ChatSessionRepository` 和现有导入导出数据结构。
- 个性化选择器调用 `ChatSessionStore.setActivePal`；创建/编辑复用 `PalSheet`、`PalStore` 与原有系统提示词构造。
- 没有增加平行角色存储或跨会话长期记忆。
- 角色、生成参数、停止和导入导出针对性验证：6 组 / 141 项测试通过。
- LocalPal 主流程传递 `enableVoice=false`，隐藏录音、语音模式与朗读，取消语音和购买的启动初始化。
- 对已保存自动朗读偏好同时关闭流式语音与回复结束播放；保留偏好原值和共享组件的原有默认行为。
- 语音范围修正验证：13 组 / 205 项测试通过；保存偏好回归验证：2 组 / 70 项通过，包含文字回复正常完成且不触发语音回调。

### Batch 4：Markdown

独立 Marked 实例只为“完整顶层段落且内容为一个 emphasis token”的节点标记 `standalone-italic`。不改写原始 Markdown，不进行语义判断或角色扮演分类。

- 浅色 #6B7280；深色 #9CA3AF；保持斜体。
- 普通正文、行内斜体、标题、列表、引用和代码不获得该灰色样式。
- 保留链接、表格、代码、原结构及 reference links。
- 2 组 / 38 项测试通过，覆盖真实渲染后的深浅色样式、不完整流式段落到完整段落的转换、代码/表格和 500 对长段落。

## 自动化测试记录

- 早期完整实现回归：**444 组 / 9,374 项通过，2 项跳过，310 个快照通过**，exit 0，243.08 秒。
- 后续输入区/模型卡片：3 组 / 121 项通过；导航：2 组 / 24 项通过。
- 最近类型检查：通过，18.95 秒。
- 最终全局 lint：0 错误，46 项原有警告，45.84 秒；改动文件 lint 也通过。
- 最终源码完整测试第一次：444 组 / 9,378 项通过，1 项设计变量清单检查失败，2 项跳过，全部 310 个快照通过，248.575 秒。
- 失败定位到模型卡片有意使用的 `theme.radius.l`。该检查明确允许记录架构说明后添加精确文件；已添加该文件与说明，4 项规范测试通过。修正后的完整重跑已通过（见下）。
- 针对性测试使用 `--coverage=false`；完整回归保留仓库的全局覆盖率要求。

Batch 3 的角色验证和 Batch 4 的 Markdown 合并在一次备份提交中，未拆分或改写已推送历史；这与原计划“每 Batch 单独提交”的差异在此明确记录。

## Android 构建环境与原生负载

构建工具安装在仓库外：Node 22.21.0（`.nvmrc`）、Java 17、Android SDK / Build Tools 37、NDK 27.3.13750724、CMake 3.22.1；语音依赖自动安装 NDK 28.2.13676358。未升级应用依赖。

- 仅在存在真实 `google-services.json` 时应用 Google Services 插件；没有伪造 Firebase 配置。带真实配置的原有构建保持原行为。
- 遵照上游 CI，从源码构建已修补的 llama.rn，保持原始 native payload manifest 和验证器。
- Hexagon SDK 6.4.0.2 / Tools 19.0.04 与上游 CI 一致。
- SDK 压缩包 SHA256：`b4a57a774795cf12da19a777a5d306e970905bf9758a4c4765e5e4593428ae0b`。
- 被实际使用文件的校验 SHA256：`f56685ec2513933ab6465c44e40e8ce0263bc40751961aa2468da9cbcdfe7409`。
- 使用 `ORG_GRADLE_PROJECT_rnllamaBuildFromSource=true` 和 `verify-android-payload.js --print-variants` 给出的完整 variant 清单，配置 `HEXAGON_SDK_ROOT`、`HEXAGON_TOOLS_ROOT`。
- 早期缺 SDK 的 CPU 构建被停止，未作为最终 APK。最终配置确认启用 Hexagon DSP。
- 可选构建资源脚本：`scripts/localpal-android-build.init.gradle`。一个 Gradle worker、一个 Metro worker、llama.rn 两个 C++ 编译任务/其他模块一个；不改变运行时推理参数。
- 构建命令（在 android 目录）：`./gradlew assembleProdRelease --no-daemon --max-workers=1 --init-script ../scripts/localpal-android-build.init.gradle`。
- 最终 APK 必须通过原有 `scripts/verify-android-payload.js`，核验两种 ABI、优化库、Hexagon/OpenCL 导出、DSP 资源和原生补丁标记，不能用预编译替代绕过。
- 无私人发布密钥时沿用仓库的测试签名配置；交付应标记为测试 APK。

## APK 与 Bundle 产物

- `assembleProdRelease`：exit 0，BUILD SUCCESSFUL（1h 14m 12s；包含资源调度暂停时间）。
- APK：`LocalPal-phase1-test.apk`，约 264 MiB；包名 `com.pocketpalai`，版本 1.22.1 / code 159，min SDK 24 / target SDK 36，arm64-v8a 与 x86_64。
- APK SHA256：`9bcff5111bbcb77fde45d8915fd1865ea466421849c3cef19f313c4bc0bc6c7f`。
- APK v2 签名验证通过，测试签名；不是私人发布密钥签名。
- `verify-android-payload.js`：exit 0，所有要求的库、DSP 资源、后端导出与原生补丁标记通过。
- 最终 Android JS Bundle 已重新生成，包含最新源码和 48 项资源；另附同 APK 的 Hermes Bundle。
- JS Bundle SHA256：`d1a7c564f00f6ba3dd8e65be1f7c5eea693b0e86982c0e35da8c907118dd2300`。
- 发布 sourcemap 确认包含最新 App speech opt-out 与 `useChatSession` playback gate，不是早期缓存版本。
- GitHub 开发分支持续备份源码。APK / JS Bundle / 原生验证报告保存在交付附件目录；当前 CLI 没有可用于 Release 附件上传的凭据，没有发布公开 Release。

## 尚未执行的验收与环境限制

- AOSP Android 30 x86_64 模拟器使用软件模拟（没有 KVM）。APK 安装日志返回 Success，启动命令已发送。系统启动期间出现 System UI 无响应提示；完整应用界面、截图对照和重启持久化验收未完成，不能记为通过。
- `huggingface.co` 的真实 GGUF 下载被代理拒绝：`CONNECT tunnel failed, response 403`。未通过其他主机绕过策略，也未用模拟模型冒充真实推理。
- 用户已选择“先交付 APK，模型在真机上验收”。因此不再等待网络变更；模型实测明确移交真机验收，未记录为已通过。
- Markdown / 历史导入样例明确注明“导入样例，非本地模型生成”，只用于界面、导入和持久化检查。
- 真机安装、离线模型生成、停止、模型下载/导入/加载/卸载/删除、视觉投影及重启持久化未实际执行的部分均保持待验证，不能用 Jest 或截图替代。

## 最终交付与备份记录

- 最终全量 Jest：**445 组 / 9,379 项通过，2 项跳过，310 个快照通过**，exit 0，310.028 秒；全局覆盖率要求保持启用。
- 日志：`/tmp/localpal-final-verified-tests.log`；类型检查与 lint 结果见上。
- 模拟器安装日志返回 `Performing Streamed Install` / `Success`；启动命令为 `com.pocketpalai/com.pocketpal.MainActivity`。这仅证明安装与启动命令执行，不等于所有 UI 或推理验收通过。
- 用户选择先交付 APK，模型在真机验收，并要求直接提供 APK；已提供 `LocalPal-phase1-test.apk` 下载链接。
- 所有源码改动已在功能分支推送并逐次核对远程 SHA；本次补全最终测试、构建与交付报告。main 保持原基线。
- APK、JS Bundle 和临时构建工具是构建产物，未作为源码加入 Git；APK 校验值及构建依据已记录在本报告。
