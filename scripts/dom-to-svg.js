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

  function geometry(element, scale) {
    return {
      x: number(element.offsetLeft * scale),
      y: number(element.offsetTop * scale),
      width: number(element.offsetWidth * scale),
      height: number(element.offsetHeight * scale),
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

  function assetSvg(element, scale) {
    const style = getComputedStyle(element);
    const box = geometry(element, scale);
    const href = element.dataset.exportSrc || element.src;
    return `<image x="${box.x}" y="${box.y}" width="${box.width}" height="${box.height}" href="${escapeXml(href)}" opacity="${number(parseFloat(style.opacity))}"${transform(rotationOf(style), box)}/>`;
  }

  function textData(element, scale) {
    const style = getComputedStyle(element);
    const box = geometry(element, scale);
    const fontSizePx = parseFloat(style.fontSize);
    const lineHeightPx = style.lineHeight === 'normal' ? fontSizePx * 1.2 : parseFloat(style.lineHeight);
    const letterSpacingPx = style.letterSpacing === 'normal' ? 0 : parseFloat(style.letterSpacing);
    const lines = element.textContent.trim().split(/\r?\n/).map((line) => line.trim());
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
      align: style.textAlign || 'left',
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

    const scale = width / artboard.offsetWidth;
    const graphicParts = [];
    artboard.querySelectorAll('.shape, img.asset').forEach((element) => {
      graphicParts.push(element.matches('.shape') ? shapeSvg(element, scale) : assetSvg(element, scale));
    });

    const texts = Array.from(artboard.querySelectorAll('.text-block')).map((element) => textData(element, scale));
    const ids = texts.map((block) => block.id);
    if (ids.some((id) => !id) || new Set(ids).size !== ids.length) throw new Error('Cada .text-block precisa de id único.');
    if (texts.some((block) => !block.role || !block.font)) throw new Error('Cada .text-block precisa de data-role e data-ai-font.');

    const textParts = texts.map(textSvg);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}mm" height="${height}mm" viewBox="0 0 ${width} ${height}"><g id="ARTE">${graphicParts.join('')}</g><g id="TEXTOS_ORIGINAIS">${textParts.join('')}</g></svg>\n`;

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
