const fs = require('fs');
const path = require('path');

for (const lado of ['frente', 'verso']) {
  const html = fs.readFileSync(path.join(__dirname, `${lado}.html`), 'utf8');
  const match = html.match(/<svg id="artwork"([\s\S]*?)<\/svg>/);
  if (!match) throw new Error(`SVG #artwork não encontrado em ${lado}.html`);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg${match[1]}</svg>\n`;
  fs.writeFileSync(path.join(__dirname, `${lado}.svg`), svg, 'utf8');
}

console.log('frente.svg e verso.svg gerados.');
