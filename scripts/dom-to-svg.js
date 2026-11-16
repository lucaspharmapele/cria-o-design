(function () {
  function escapeXml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function number(value) {
    return Math.round(value * 1000) / 1000;
  }

  function colorToHex(value) {
    const match = String(value).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!match) return '000000';
    return [match[1], match[2], match[3]]
      .map((part) => Number(part).toString(16).padStart(2, '0'))
      .join('');
  }

  function rotationOf(style) {
    if (!style.transform || style.transform === 'none') return 0;
    const matrix = new DOMMatrix(style.transform);
    return number(Math.atan2(matrix.b, matrix.a) * 180 / Math.PI);
  }

  // Valores fracionários do estilo calculado: offset* arredonda para px inteiro e estreita as caixas de texto.
  function geometry(element, scale) {
    const style = getComputedStyle(element);
    const pick = (value, fallback) => (Number.isFinite(parseFloat(value)) ? parseFloat(value) : fallback);
    return {
      x: number(pick(style.left, element.offsetLeft) * scale),
      y: number(pick(style.top, element.offsetTop) * scale),
      width: number(pick(style.width, element.offsetWidth) * scale),
      height: number(pick(style.height, element.offsetHeight) * scale),
    };
  }

  function transform(rotation, box) {
    if (!rotation) return '';
    const cx = number(box.x + box.width / 2);
    const cy = number(box.y + box.height / 2);
    return ` transform="rotate(${rotation} ${cx} ${cy})"`;
  }

  function shapeSvg(element, scale) {
    const style = getComputedStyle(element);
    const box = geometry(element, scale);
    const rotation = rotationOf(style);
    const fill = style.backgroundColor === 'rgba(0, 0, 0, 0)' ? 'none' : style.backgroundColor;
    const borderWidth = parseFloat(style.borderTopWidth) || 0;
    const stroke = borderWidth ? style.borderTopColor : 'none';
    const opacity = parseFloat(style.opacity);
    return `<rect x="${box.x}" y="${box.y}" width="${box.width}" height="${box.height}" fill="${escapeXml(fill)}" stroke="${escapeXml(stroke)}" stroke-width="${number(borderWidth * scale)}" opacity="${number(opacity)}"${transform(rotation, box)}/>`;
  }

  // Illustrator: lê só xlink:href, aplica x/y de <image> duas vezes e não vincula SVG dentro de SVG.
  // Por isso: raster vinculado posicionado por translate; SVG embutido como vetor.
  async function assetSvg(element, scale, index) {
    const style = getComputedStyle(element);
    const box = geometry(element, scale);
    const opacity = number(parseFloat(style.opacity));
    const rotation = rotationOf(style);
    if (!element.src.startsWith('data:image/svg+xml')) {
      // Caixa exata da imagem (object-fit: contain), para o vínculo não depender de preserveAspectRatio.
      const fit = Math.min(box.width / element.naturalWidth, box.height / element.naturalHeight);
      const w = number(element.naturalWidth * fit);
      const h = number(element.naturalHeight * fit);
      const x = number(box.x + (box.width - w) / 2);
      const y = number(box.y + (box.height - h) / 2);
      const rotate = rotation ? `rotate(${rotation} ${number(box.x + box.width / 2)} ${number(box.y + box.height / 2)}) ` : '';
      const href = element.dataset.exportSrc || element.src;
      return `<image width="${w}" height="${h}" transform="${rotate}translate(${x} ${y})" xlink:href="${escapeXml(href)}" opacity="${opacity}"/>`;
    }
    const source = new DOMParser().parseFromString(await (await fetch(element.src)).text(), 'image/svg+xml').documentElement;
    const viewBox = (source.getAttribute('viewBox') || `0 0 ${parseFloat(source.getAttribute('width'))} ${parseFloat(source.getAttribute('height'))}`).trim().split(/[\s,]+/).map(Number);
    const fit = Math.min(box.width / viewBox[2], box.height / viewBox[3]);
    const tx = number(box.x + (box.width - viewBox[2] * fit) / 2 - viewBox[0] * fit);
    const ty = number(box.y + (box.height - viewBox[3] * fit) / 2 - viewBox[1] * fit);
    // Prefixo por asset: classes e ids repetidos entre arquivos colidiriam no mesmo documento.
    const prefix = `asset${index}-`;
    source.querySelectorAll('[id]').forEach((node) => node.setAttribute('id', prefix + node.getAttribute('id')));
    source.querySelectorAll('[class]').forEach((node) => node.setAttribute('class', node.getAttribute('class').trim().split(/\s+/).map((name) => prefix + name).join(' ')));
    source.querySelectorAll('style').forEach((node) => { node.textContent = node.textContent.replace(/\.([A-Za-z_][\w-]*)/g, `.${prefix}$1`); });
    source.querySelectorAll('title').forEach((node) => node.remove());
    const inherited = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin']
      .filter((name) => source.hasAttribute(name))
      .map((name) => ` ${name}="${escapeXml(source.getAttribute(name))}"`).join('');
    const inner = Array.from(source.childNodes).map((node) => new XMLSerializer().serializeToString(node)).join('');
    return `<g id="ASSET__${index}" opacity="${opacity}"${transform(rotation, box)}><g transform="translate(${tx} ${ty}) scale(${number(fit * 1e6) / 1e6})"${inherited}>${inner}</g></g>`;
  }

  // Linhas como aparecem na tela: em blocos com quebra automática (.wrap), mede onde o navegador quebrou.
  function renderedLines(element, style) {
    if (style.whiteSpace.startsWith('pre')) return element.textContent.trim().split(/\r?\n/).map((line) => line.trim());
    const node = element.firstChild;
    const text = node.textContent;
    const range = document.createRange();
    const lines = [];
    let current = '';
    let lastTop = null;
    for (let i = 0; i < text.length; i++) {
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rects = range.getClientRects();
      const top = rects.length ? Math.round(rects[rects.length - 1].top) : lastTop;
      if (lastTop !== null && top > lastTop + 1) { lines.push(current.trim()); current = ''; }
      current += text[i];
      lastTop = top;
    }
    lines.push(current.trim());
    return lines.filter((line) => line);
  }

  function textData(element, scale) {
    const style = getComputedStyle(element);
    const box = geometry(element, scale);
    const fontSizePx = parseFloat(style.fontSize);
    const lineHeightPx = style.lineHeight === 'normal' ? fontSizePx * 1.2 : parseFloat(style.lineHeight);
    const letterSpacingPx = style.letterSpacing === 'normal' ? 0 : parseFloat(style.letterSpacing);
    const lines = renderedLines(element, style);
    return {
      id: element.id,
      role: element.dataset.role,
      name: element.dataset.name || element.id,
      text: lines.join('\r'),
      lines,
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
      font: element.dataset.aiFont,
      fontFamily: style.fontFamily.split(',')[0].replace(/["']/g, ''),
      fontWeight: style.fontWeight,
      size: number(fontSizePx * 72 / 96),
      leading: number(lineHeightPx * 72 / 96),
      tracking: number(letterSpacingPx / fontSizePx * 1000),
      color: colorToHex(style.color),
      // Normaliza para left/center/right, os únicos valores que SVG e JSX tratam.
      align: { start: 'left', end: 'right', justify: 'left' }[style.textAlign] || style.textAlign || 'left',
      rotation: rotationOf(style),
      opacity: number(parseFloat(style.opacity)),
      fontSizeMm: number(fontSizePx * scale),
      lineHeightMm: number(lineHeightPx * scale),
    };
  }

  function textSvg(block) {
    const anchor = block.align === 'center' ? 'middle' : block.align === 'right' ? 'end' : 'start';
    const x = block.align === 'center' ? block.x + block.width / 2 : block.align === 'right' ? block.x + block.width : block.x;
    const firstBaseline = block.y + block.fontSizeMm * 0.82;
    const tspans = block.lines.map((line, index) =>
      `<tspan x="${number(x)}" dy="${index ? block.lineHeightMm : 0}">${escapeXml(line)}</tspan>`
    ).join('');
    const box = { x: block.x, y: block.y, width: block.width, height: block.height };
    return `<text id="SOURCE__${escapeXml(block.id)}" x="${number(x)}" y="${number(firstBaseline)}" font-family="${escapeXml(block.fontFamily)}" font-size="${block.fontSizeMm}" font-weight="${escapeXml(block.fontWeight)}" letter-spacing="${number(block.tracking / 1000 * block.fontSizeMm)}" text-anchor="${anchor}" fill="#${block.color}" opacity="${block.opacity}"${transform(block.rotation, box)}>${tspans}</text>`;
  }

  async function exportDocument() {
    const artboard = document.querySelector('.artboard');
    if (!artboard) throw new Error('Elemento .artboard não encontrado.');
    const width = Number(artboard.dataset.widthMm);
    const height = Number(artboard.dataset.heightMm);
    const page = artboard.dataset.page;
    if (!width || !height || !page) throw new Error('A prancheta precisa de data-width-mm, data-height-mm e data-page.');

    const scale = width / parseFloat(getComputedStyle(artboard).width);
    const graphicParts = [];
    let assetIndex = 0;
    for (const element of artboard.querySelectorAll('.shape, img.asset')) {
      graphicParts.push(element.matches('.shape') ? shapeSvg(element, scale) : await assetSvg(element, scale, assetIndex++));
    }

    const texts = Array.from(artboard.querySelectorAll('.text-block')).map((element) => textData(element, scale));
    const ids = texts.map((block) => block.id);
    if (ids.some((id) => !id) || new Set(ids).size !== ids.length) throw new Error('Cada .text-block precisa de id único.');
    if (texts.some((block) => !block.role || !block.font)) throw new Error('Cada .text-block precisa de data-role e data-ai-font.');

    const textParts = texts.map(textSvg);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}mm" height="${height}mm" viewBox="0 0 ${width} ${height}"><g id="ARTE">${graphicParts.join('')}</g><g id="TEXTOS_ORIGINAIS">${textParts.join('')}</g></svg>\n`;

    return {
      svg,
      contract: {
        page,
        width,
        height,
        sourceGroupName: 'TEXTOS_ORIGINAIS',
        sourceTextMin: texts.length,
        sourceTextMax: texts.reduce((sum, block) => sum + block.lines.length, 0),
        texts: texts.map(({ lines, fontFamily, fontWeight, fontSizeMm, lineHeightMm, opacity, ...block }) => block),
      },
    };
  }

  window.CriacaoDesignDomExporter = { exportDocument };
})();
