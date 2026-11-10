Windhawk 界面汉化补丁 v1.0.27（已构建完整包，解压后双击「一键安装.bat」即可）。

## 本版修的是「翻完还剩英文」

- 所有接口请求走同一个起跑闸门，相邻请求至少隔 300ms，不再一口气丢出几十个并发。
- 撞到 429 不再只冷却单通道：整条队列一起暂停，首次 2 秒、连续 429 逐次加长到 60 秒，成功一次即清零。
- 失败文本从 4 次放宽到 9 次，等待逐次加长（60 秒起、最多 5 分钟），到期自动回来重试。
- 「正在翻译… 余 N 条」把等待重试的条目也算进去，并写明「（接口限流，约 X 秒后重试）」。

## 适用环境

Windows 10/11 + Windhawk 1.7.3，需管理员权限安装（写入 Program Files）。

## 翻译通道

`clients5.google.com` → `translate.googleapis.com` → `api.mymemory.translated.net`，均为免密钥公共接口，配额有限，一页几百条时可能等几分钟。

## 卸载还原

双击「一键卸载.bat」，按 `_zh_backup` 里的原件逐字节还原 `index.html` 与 `extension.js`。

## 校验值（SHA256）

- `Windhawk-patch-v1.0.27.zip` = `3707604acf105f6013f95247cb807092b38916f8caf5c82be56de6da09f2be45`
- `windhawk-zh-cn.js` = `3b17bd5286844b41e52975790005c7953ee3d5208fc576fa03131314e53968e6`
