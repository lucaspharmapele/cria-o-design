const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const [htmlArg, svgArg, jsxArg] = process.argv.slice(2);
if (!htmlArg || !svgArg || !jsxArg) {
  throw new Error('Uso: node export-design.js <pagina.html> <saida.svg> <saida.jsx>');
}

const htmlPath = path.resolve(htmlArg);
const svgPath = path.resolve(svgArg);
const jsxPath = path.resolve(jsxArg);
const runtimePath = path.join(__dirname, 'illustrator-text-runtime.jsxinc');
const browserScript = fs.readFileSync(path.join(__dirname, 'dom-to-svg.js'), 'utf8');
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempHtml = path.join(path.dirname(htmlPath), `.codex-export-${process.pid}.html`);
const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'criacao-design-'));

function mimeFor(file) {
  const extension = path.extname(file).toLowerCase();
  return extension === '.svg' ? 'image/svg+xml' : extension === '.png' ? 'image/png' : extension === '.jpg' || extension === '.jpeg' ? 'image/jpeg' : 'application/octet-stream';
}

function inlineImages(html) {
  return html.replace(/(<img\b[^>]*\bsrc=["'])([^"']+)(["'])/gi, (match, before, source, after) => {
    if (/^(data:|https?:)/i.test(source)) return match;
    const file = path.resolve(path.dirname(htmlPath), decodeURIComponent(source));
    const data = fs.readFileSync(file).toString('base64');
    const exportSource = path.relative(path.dirname(svgPath), file).replace(/\\/g, '/');
    return `${before}data:${mimeFor(file)};base64,${data}${after} data-export-src="${exportSource}"`;
  });
}

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function jsxInclude(from, to) {
  return path.relative(path.dirname(from), to).replace(/\\/g, '/');
}

try {
  let html = inlineImages(fs.readFileSync(htmlPath, 'utf8'));
  const injection = `<script>${browserScript}</script><script>window.addEventListener('load',async()=>{await document.fonts.ready;const result=await window.CriacaoDesignDomExporter.exportDocument();document.body.setAttribute('data-export-result','1');document.body.textContent=JSON.stringify(result);});</script>`;
  html = html.replace('</body>', `${injection}</body>`);
  fs.writeFileSync(tempHtml, html, 'utf8');

  const pageUrl = new URL(`file:///${tempHtml.replace(/\\/g, '/')}`).href;
  const chrome = spawnSync(chromePath, [
    '--headless=new', '--disable-gpu', '--disable-extensions', '--allow-file-access-from-files',
    '--run-all-compositor-stages-before-draw', '--virtual-time-budget=2000',
    `--user-data-dir=${tempProfile}`, '--dump-dom', pageUrl,
  ], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });

  if (chrome.status !== 0) throw new Error(chrome.stderr || `Chrome terminou com código ${chrome.status}`);
  if (!chrome.stdout.includes('data-export-result="1"')) throw new Error('O navegador não concluiu a exportação do DOM.');
  const body = chrome.stdout.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!body) throw new Error('Resultado do navegador sem <body>.');
  const result = JSON.parse(decodeHtml(body[1]));

  if (!result.svg || !result.contract?.texts?.length) throw new Error('Contrato de exportação vazio.');
  fs.mkdirSync(path.dirname(svgPath), { recursive: true });
  fs.mkdirSync(path.dirname(jsxPath), { recursive: true });
  fs.writeFileSync(svgPath, result.svg, 'utf8');

  const config = {
    documentName: path.basename(svgPath).toLowerCase(),
    ...result.contract,
  };
  const jsx = `#target illustrator\n#include "${jsxInclude(jsxPath, runtimePath)}"\n\nCriacaoDesign.run(${JSON.stringify(config, null, 2)});\n`;
  fs.writeFileSync(jsxPath, jsx, 'utf8');

  const ids = config.texts.map((block) => block.id);
  if (new Set(ids).size !== ids.length) throw new Error('O contrato gerou IDs duplicados.');
  console.log(`${path.basename(htmlPath)}: ${config.texts.length} caixas → ${path.basename(svgPath)} + ${path.basename(jsxPath)}`);
} finally {
  if (fs.existsSync(tempHtml)) fs.rmSync(tempHtml, { force: true });
  try { fs.rmSync(tempProfile, { recursive: true, force: true }); } catch (_) {}
}
