# LocalPal Android 测试版下载包

1. 下载本分支 ZIP，并**完整解压**。
2. 双击解压目录中的 **Save-APK-to-Desktop.cmd**。
3. 等待绿色成功提示，桌面就会出现 **LocalPal-phase1-test.apk**。

请不要直接在 ZIP 压缩包里运行，不要单独下载某一个 part 文件。

还原工具仅使用 Windows 自带的 PowerShell，将本地六个分段合并到桌面并校验 SHA256。它不会下载其他程序、安装软件或覆盖桌面已有的不同文件。

- 原始 APK：275,944,815 字节（约 264 MiB），测试签名。
- 版本 1.22.1 / code 159；Android 7.0+，arm64-v8a / x86_64。
- SHA256：`9bcff5111bbcb77fde45d8915fd1865ea466421849c3cef19f313c4bc0bc6c7f`
- 源码分支：`feat/localpal-phase1-rebuild`；源码提交：`27e66d6341612e1b1d4d064070c824f1d29e2deb`。
- APK 构建、签名与原生负载检查通过；445 组 / 9,379 项测试、310 个快照通过，另有 2 项跳过。模型和真机验收待执行。

APK 因 GitHub 单文件限制分为六段；按编号直接连接即可还原原文件，没有重新打包、重新签名或修改 APK 内容。详细大小与校验值见 manifest.json。

本分支只用于产物下载，不修改 main 或源码分支。
