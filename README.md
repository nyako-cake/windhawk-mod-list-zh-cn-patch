# Windhawk mod 列表汉化补丁

给 [Windhawk](https://windhawk.net) 的界面做简体中文汉化。不改源码、不碰 mod 本体，直接给磁盘上已装的 prebuilt webview 打补丁：往 `webview/index.html` 尾部插一个脚本，并放行 `dist/extension.js` 里 CSP 的翻译域名。卸载时按备份逐字节还原。

当前版本：**v1.0.27**

## 适用环境

- Windows 10 / 11
- Windhawk 1.7.3（安装目录 `C:\Program Files\Windhawk`）
- 需要管理员权限安装（写入 Program Files）

## 安装

1. 把 `Windhawk-patch-v1.0.27.zip` 解压到任意位置，或直接用 `package/` 目录里的文件。
2. 双击 `一键安装.bat`，UAC 弹窗点「是」。
3. 打开 Windhawk（`C:\Program Files\Windhawk\windhawk.exe`），右上角「汉化已开」为开即生效。

卸载：双击 `一键卸载.bat`，按 `_zh_backup` 里的原件还原 `index.html` 与 `extension.js`，并删除注入脚本。

## 功能

- **界面词表 + 机翻**：导航、表头、筛选、按钮、Mod 名称与描述优先走内置词表与离线包，其余走机翻。
- **中文搜索**：补丁改写 `String.prototype.includes`，按译文反查英文原文，搜索框能直接输中文命中。
- **双语显示（可选）**：中文在上、灰色小字英文在下。
- **源码页不翻**：`monaco-editor` / `ace_editor` / `SyntaxHighlighter` / `DiffWrapper` 等代码区域整体跳过。
- **离线翻译包**：设置面板里可一键预抓取官方目录（`mods.windhawk.net`）的译文，默认 3 并发、可调 1–6。
- **可调毫秒延迟**：译文回来后可延后 N 毫秒再替换，默认 0，用于看清跳变。
- **限流自愈（v1.0.27）**：所有接口请求共用同一个起跑闸门（最小间隔 300ms）；撞到 429 整条队列暂停（2 秒起、逐次加长到 60 秒）；失败文本最多重试 9 次，到期自动回来重试。

## 翻译通道

只保留三条免密钥通道：

- `clients5.google.com/translate_a/t`（首选）
- `translate.googleapis.com/translate_a/single`（备选）
- `api.mymemory.translated.net`（兜底）

都是免费公共接口，配额有限。一页几百条文本时可能遇到 429：提示条会显示「（接口限流，约 X 秒后重试）」，配额恢复后自动补齐，也可以点「重新抓取」清掉冷却重新排队。

> v1.0.24 曾内置微软 Azure 与百度翻译两条带密钥通道，v1.0.26 已按需求整体删除（含 CSP 白名单、设置面板字段与引擎档位）。

## 目录

```
Windhawk-patch-v1.0.27.zip     完整安装包（解压即用）
package/
  windhawk-zh-cn.js            注入脚本（payload）
  install.ps1                  安装脚本（注入 + CSP 放行 + 备份）
  uninstall.ps1                卸载脚本（按备份还原）
  一键安装.bat / 一键卸载.bat   提权入口
  使用说明.txt                 完整说明与版本记录
SHA256SUMS.txt                 各文件校验值
```

## 校验值（v1.0.27）

| 文件 | SHA256 |
| --- | --- |
| windhawk-zh-cn.js | `3b17bd5286844b41e52975790005c7953ee3d5208fc576fa03131314e53968e6` |
| install.ps1 | `c32dcbd3a404f4ffd5b9cdf58efc013858105901e4643d1c010b37b3878905e7` |
| uninstall.ps1 | `63d60a024da0539b64eae9e3a34fbd084891fc1959255b273131c6167496225c` |
| 使用说明.txt | `60fa633b5f823c4557f7c51a92b37b8c62c24bd97cd12aaf8143f3e0e0edcd4a` |

## 常见问题

**页面还有整段英文？**
先看右上角提示条。显示「余 N 条」说明还在翻；显示「（接口限流，约 X 秒后重试）」说明免费接口配额被打满了，等一会儿会自动补上。确实不想等就点设置面板的「重新抓取」。

**提示脚本没加载？**
确认 `index.html` 尾部有 `<!-- windhawk-zh-cn-patch -->`，且同目录存在 `windhawk-zh-cn.js`。手动删掉标记后重跑一次安装即可（安装是幂等的）。

**CSP 被 Windhawk 更新重置了？**
Windhawk 升级会覆盖 `extension.js`，重跑一次 `一键安装.bat` 即可恢复放行。

## 版本记录（摘要）

| 版本 | 内容 |
| --- | --- |
| v1.0.27 | 请求闸门 300ms、429 全队列暂停、失败重试放宽到 9 次、提示条计入冷却条目 |
| v1.0.26 | 删除微软与百度两条通道，引擎回退到自动（Google → MyMemory），清理旧密钥残留 |
| v1.0.25 | 百度免费版 QPS=1 串行化（1100ms 间隔）与错误码分级 |
| v1.0.24 | 微软 Azure / 百度翻译两条带密钥通道，`inFlight` 在途去重 |
| v1.0.23 | 打开开关即重新抓取翻译 |
| v1.0.22 | UI 界面词表、失败退避重试、面板诊断行 |
| v1.0.21 | clients5 通道与三级链路、CSP token 幂等追加 |
| v1.0.20 | 离线包预翻译并发（1–6）与通道冷却 |
| v1.0.19 | 中文搜索（按译文反查） |
| v1.0.18 | 离线翻译包（预抓取官方目录译文） |
| v1.0.17 | 源码页整块跳过 |
| v1.0.16 | 「正在翻译… 余 N 条」提示 + 可调毫秒延迟 |
| v1.0.10 | 只改文字值 / 只改 display / 只追加自己的节点（避免 React removeChild 崩溃） |

## 许可

仅用于本机界面汉化，请自行评估对 Windhawk 升级与官方支持的影响。Windhawk 本体与 mod 版权归各自作者。
