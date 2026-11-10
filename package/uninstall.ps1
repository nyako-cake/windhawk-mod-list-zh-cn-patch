param([string]$Root = '')

$ErrorActionPreference = 'Stop'
$marker = '<!-- windhawk-zh-cn-patch -->'
$pattern = '<!-- windhawk-zh-cn-patch --><script src="windhawk-zh-cn.js"></script>'

Write-Host '=== 卸载 Windhawk 汉化补丁 ===' -ForegroundColor Cyan

if (-not $Root) {
    foreach ($c in @("$env:ProgramFiles\Windhawk", "${env:ProgramFiles(x86)}\Windhawk", "$env:LOCALAPPDATA\Windhawk")) {
        if (Test-Path -LiteralPath (Join-Path $c 'windhawk.exe')) { $Root = $c; break }
    }
}
if (-not $Root) { throw '没有找到 Windhawk 的安装目录。' }

$ext = Join-Path $Root 'UI\resources\app\extensions\windhawk'
$webview = Join-Path $ext 'webview'
$index = Join-Path $webview 'index.html'
$extjs = Join-Path $ext 'dist\extension.js'
$backup = Join-Path $ext '_zh_backup'

$running = Get-Process -Name VSCodium -ErrorAction SilentlyContinue
if ($running) {
    Write-Host '正在关闭 Windhawk 界面...'
    try { $running | Stop-Process -Force -ErrorAction Stop } catch { Write-Host '界面没能自动关闭，请手动关掉后重新打开。' -ForegroundColor Yellow }
    Start-Sleep -Milliseconds 800
}

$utf8 = New-Object Text.UTF8Encoding($false)

if (Test-Path -LiteralPath (Join-Path $backup 'index.html')) {
    Copy-Item -LiteralPath (Join-Path $backup 'index.html') -Destination $index -Force
    Write-Host 'index.html 已还原。'
} elseif (Test-Path -LiteralPath $index) {
    $html = [IO.File]::ReadAllText($index)
    if ($html.Contains($marker)) {
        $html = $html.Replace($pattern, '')
        [IO.File]::WriteAllText($index, $html, $utf8)
        Write-Host 'index.html 里的注入已移除。'
    }
}

if (Test-Path -LiteralPath (Join-Path $backup 'extension.js')) {
    Copy-Item -LiteralPath (Join-Path $backup 'extension.js') -Destination $extjs -Force
    Write-Host 'extension.js 已还原。'
}

if (Test-Path -LiteralPath (Join-Path $webview 'windhawk-zh-cn.js')) {
    Remove-Item -LiteralPath (Join-Path $webview 'windhawk-zh-cn.js') -Force
    Write-Host '已删除汉化脚本。'
}

if (Test-Path -LiteralPath $backup) {
    Remove-Item -LiteralPath $backup -Recurse -Force
    Write-Host '已删除备份目录。'
}

Write-Host ''
Write-Host '卸载完成，重新打开 Windhawk 即为原版界面。' -ForegroundColor Green