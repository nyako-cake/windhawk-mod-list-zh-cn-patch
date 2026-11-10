param([string]$Root = '')

$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$payload = Join-Path $here 'windhawk-zh-cn.js'
$marker = '<!-- windhawk-zh-cn-patch -->'
$block = $marker + '<script src="windhawk-zh-cn.js"></script>'

Write-Host '=== Windhawk 汉化补丁 v1.0.27 ===' -ForegroundColor Cyan

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

foreach ($f in @($index, $extjs)) {
    if (-not (Test-Path -LiteralPath $f)) { throw "缺少文件：$f`n这一版 Windhawk 的界面结构不同，补丁不适用。" }
}
if (-not (Test-Path -LiteralPath $payload)) { throw "补丁文件缺失：$payload" }

Write-Host "安装目录：$Root"

$running = Get-Process -Name VSCodium -ErrorAction SilentlyContinue
if ($running) {
    Write-Host '正在关闭 Windhawk 界面（安装后重新打开即可）...'
    try { $running | Stop-Process -Force -ErrorAction Stop } catch { Write-Host '界面没能自动关闭，请手动关掉后重新打开。' -ForegroundColor Yellow }
    Start-Sleep -Milliseconds 800
}

$backup = Join-Path $ext '_zh_backup'
$utf8 = New-Object Text.UTF8Encoding($false)

function ReadText([string]$path) {
    $bytes = [IO.File]::ReadAllBytes($path)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        return [IO.File]::ReadAllText($path, (New-Object Text.UTF8Encoding($true, $true)))
    }
    return [IO.File]::ReadAllText($path, (New-Object Text.UTF8Encoding($false, $true)))
}

# 备份只做一次：重复安装不会把打过补丁的文件当成原件存起来
if (-not (Test-Path -LiteralPath $backup)) {
    New-Item -ItemType Directory -Path $backup | Out-Null
    Copy-Item -LiteralPath $index -Destination (Join-Path $backup 'index.html')
    Copy-Item -LiteralPath $extjs -Destination (Join-Path $backup 'extension.js')
    Write-Host '已备份原始文件，可随时一键还原。'
} else {
    Write-Host '原始备份已存在，继续。'
}

Copy-Item -LiteralPath $payload -Destination (Join-Path $webview 'windhawk-zh-cn.js') -Force

$html = ReadText $index
if ($html.Contains($marker)) {
    Write-Host 'index.html 已经注入过脚本，跳过。'
} elseif ($html.Contains('</body>')) {
    $html = $html.Replace('</body>', $block + '</body>')
    [IO.File]::WriteAllText($index, $html, $utf8)
    Write-Host '已把汉化脚本接入界面。'
} else {
    throw 'index.html 里没有找到 </body>，结构不认识。'
}

$js = ReadText $extjs
$need = @('https://translate.googleapis.com', 'https://clients5.google.com', 'https://api.mymemory.translated.net', 'https://mods.windhawk.net')
$drop = @('https://api.cognitive.microsofttranslator.com', 'https://fanyi-api.baidu.com')
$bt = [char]96
$js2 = $js
$changed = $false
foreach ($dir in @('connect-src', 'script-src')) {
    $pat = $dir + ' ([^' + $bt + ']+)'
    $ms = [regex]::Matches($js2, $pat)
    if ($ms.Count -eq 0) {
        if ($dir -eq 'connect-src') { throw '在 extension.js 里没有找到 connect-src，可能版本不匹配。' }
        continue
    }
    for ($i = $ms.Count - 1; $i -ge 0; $i--) {
        $m = $ms[$i]
        $tokens = [regex]::Split($m.Groups[1].Value.Trim(), '\s+')
        $keep = @()
        foreach ($t in $tokens) { if ($t -ne '' -and $drop -notcontains $t) { $keep += $t } }
        $missing = @()
        if ($dir -eq 'connect-src') { foreach ($d in $need) { if ($keep -notcontains $d) { $missing += $d } } }
        $newVal = (($keep + $missing) -join ' ')
        if ($newVal -ne $m.Groups[1].Value) {
            $js2 = $js2.Remove($m.Groups[1].Index, $m.Groups[1].Length).Insert($m.Groups[1].Index, $newVal)
            $changed = $true
        }
    }
}
if ($changed) {
    [IO.File]::WriteAllText($extjs, $js2, $utf8)
    Write-Host '翻译接口白名单已更新为 Google / MyMemory 两通道（微软与百度域名已清掉）。'
} else {
    Write-Host '翻译接口白名单已是目标状态，跳过。'
}$check = ReadText $index
if (-not $check.Contains($marker)) { throw '校验失败：脚本没有写进去。' }

Write-Host ''
Write-Host '完成。打开 Windhawk，把界面语言设为「简体中文」，mod 列表就会显示中文。' -ForegroundColor Green
Write-Host '内置译文立即生效；没收录的 mod 会先显示英文，随后自动变成中文（机翻，需联网）。'
Write-Host '想还原：双击「一键卸载.bat」。'