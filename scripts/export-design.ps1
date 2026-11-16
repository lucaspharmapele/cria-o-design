param(
  [Parameter(Mandatory)][string]$Html,
  [Parameter(Mandatory)][string]$Svg,
  [Parameter(Mandatory)][string]$Jsx
)
# Exporta a prévia HTML para SVG + JSX com o Chrome headless, rodando dom-to-svg.js no navegador.
# Uso: powershell -File scripts\export-design.ps1 -Html <pagina.html> -Svg <saida.svg> -Jsx <saida.jsx>
$ErrorActionPreference = 'Stop'
$chrome = if ($env:CHROME_PATH) { $env:CHROME_PATH } else { 'C:\Program Files\Google\Chrome\Application\chrome.exe' }
$utf8 = New-Object System.Text.UTF8Encoding($false)
function Rel($fromDir, $to) {
  $u = (New-Object Uri ((Resolve-Path -LiteralPath $fromDir).Path.TrimEnd('\') + '\')).MakeRelativeUri((New-Object Uri $to))
  [Uri]::UnescapeDataString($u.ToString())
}
$Html = (Resolve-Path -LiteralPath $Html).Path
$Svg = [IO.Path]::GetFullPath($Svg); $Jsx = [IO.Path]::GetFullPath($Jsx)
$htmlDir = Split-Path $Html; $svgDir = Split-Path $Svg; $jsxDir = Split-Path $Jsx
New-Item -ItemType Directory -Force $svgDir, $jsxDir | Out-Null
$runtime = Join-Path $PSScriptRoot 'illustrator-text-runtime.jsxinc'
$browser = [IO.File]::ReadAllText((Join-Path $PSScriptRoot 'dom-to-svg.js'), $utf8)

# Embute as imagens para o navegador e registra o caminho relativo que o SVG vai usar.
$src = [regex]::Replace([IO.File]::ReadAllText($Html, $utf8), '(<img\b[^>]*\bsrc=["''])([^"'']+)(["''])', {
  param($m)
  if ($m.Groups[2].Value -match '^(data:|https?:)') { return $m.Value }
  $file = [IO.Path]::GetFullPath((Join-Path $htmlDir ([Uri]::UnescapeDataString($m.Groups[2].Value))))
  $mime = @{ '.svg' = 'image/svg+xml'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg' }[[IO.Path]::GetExtension($file).ToLower()]
  if (-not $mime) { $mime = 'application/octet-stream' }
  $b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($file))
  $m.Groups[1].Value + "data:$mime;base64,$b64" + $m.Groups[3].Value + " data-export-src=`"$(Rel $svgDir $file)`""
})

$docName = ConvertTo-Json ([IO.Path]::GetFileName($Svg).ToLower())
$include = ConvertTo-Json (Rel $jsxDir $runtime)
$inject = "<script>$browser</script><script>window.addEventListener('load',async()=>{await document.fonts.ready;const r=await window.CriacaoDesignDomExporter.exportDocument();const config=Object.assign({documentName:$docName},r.contract);const ids=config.texts.map(t=>t.id);if(!r.svg||!config.texts.length||new Set(ids).size!==ids.length)throw new Error('Contrato de exportação inválido.');const jsx='#target illustrator\n#include '+JSON.stringify($include)+'\n\nCriacaoDesign.run('+JSON.stringify(config,null,2)+');\n';document.body.textContent='@@'+JSON.stringify({svg:r.svg,jsx,n:config.texts.length})+'@@';});</script>"
$tmp = Join-Path $htmlDir ".export-$PID.html"
$prof = Join-Path $env:TEMP "criacao-design-$PID"
try {
  [IO.File]::WriteAllText($tmp, $src.Replace('</body>', "$inject</body>"), $utf8)
  $out = & $chrome --headless=new --disable-gpu --disable-extensions --allow-file-access-from-files --run-all-compositor-stages-before-draw --virtual-time-budget=4000 "--user-data-dir=$prof" --dump-dom ([Uri]$tmp).AbsoluteUri 2>$null | Out-String
  if ($out -notmatch '@@([\s\S]*)@@') { throw 'O navegador não concluiu a exportação do DOM.' }
  $res = [Net.WebUtility]::HtmlDecode($Matches[1]) | ConvertFrom-Json
  [IO.File]::WriteAllText($Svg, $res.svg, $utf8)
  # BOM para o ExtendScript ler os acentos corretamente.
  [IO.File]::WriteAllText($Jsx, $res.jsx, (New-Object System.Text.UTF8Encoding($true)))
  '{0}: {1} caixas -> {2} + {3}' -f (Split-Path $Html -Leaf), $res.n, (Split-Path $Svg -Leaf), (Split-Path $Jsx -Leaf)
} finally {
  Remove-Item -LiteralPath $tmp -Force -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $prof -Recurse -Force -ErrorAction SilentlyContinue
}
