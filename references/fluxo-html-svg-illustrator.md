# Fluxo técnico: HTML → SVG → Illustrator

Referência técnica da skill. As regras de criação, aprovação e marca estão no `SKILL.md` e em `marca-pharmapele.md`.

## Etapas

1. O briefing informa conteúdo, largura, altura e unidade.
2. A prévia é montada em HTML/CSS, em `prévia/`, nas dimensões exatas da peça.
3. O usuário aprova a prévia.
4. Somente quando o usuário pedir, `scripts/export-design.ps1` gera o SVG (`svg/`) e o JSX (`script/`).
5. No Illustrator: abrir o SVG e rodar o JSX em **Arquivo → Scripts → Outro script…**.
6. O JSX troca os textos de origem por caixas de texto editáveis em Mazzard. A arte fica pronta para a finalização manual.

## Como montar a prévia

Estrutura mínima da página:

```html
<link rel="stylesheet" href="base.css">
<main class="artboard" data-page="frente-01" data-width-mm="148" data-height-mm="210">
  <div class="shape" style="left:0;top:0;width:148mm;height:60mm;background:#005095"></div>
  <img class="asset" src="../apoio/foto.png" alt="" style="left:80mm;top:10mm;width:60mm;height:80mm">
  <h1 id="f01-title" class="text-block w" data-role="title" data-ai-font="MazzardH-Black"
      style="left:12mm;top:20mm;font:900 10mm/10mm MzH">VOCÊ MERECE
UM MOMENTO</h1>
</main>
```

- **Prancheta:** um único `.artboard` com `data-page`, `data-width-mm` e `data-height-mm`. Tamanho fixo, sem responsividade.
- **Tudo posicionado em `mm`**, com `position: absolute`, e **filho direto** do `.artboard`. O exportador não lê elementos aninhados em outros contêineres.
- **Retângulos:** `<div class="shape">` com cor de fundo. Bordas sólidas viram contorno. Não há suporte a cantos arredondados, sombras nem degradês; esses entram no Illustrator.
- **Imagens, logos, grafismos e ícones:** sempre `<img class="asset">` com caminho relativo para `apoio/` ou `assets/`. Não usar `background-image`, `<svg>` inline, filtros CSS nem `mix-blend-mode`. Para trocar a cor de um SVG, salvar uma cópia recolorida em `apoio/elementos/`.
- **Fotos e produtos:** usar PNG com fundo transparente, recortado na área útil, para a caixa da imagem coincidir com o objeto.
- **Fontes da prévia:** carregar os OTF de `assets/fonts/mazzard/` por `@font-face` no `base.css`. A prévia nunca deve depender das fontes instaladas.
- **`base.css` da tarefa:** além das fontes, deve ter `.artboard{position:relative;overflow:hidden}`, `.shape,.asset,.text-block{position:absolute}`, `.asset{object-fit:contain}`, `.text-block{margin:0;white-space:pre}` e `.wrap{white-space:normal}`. Modelo pronto: `examples/Teste 7/prévia/base.css`.

## Blocos de texto

Cada bloco é um elemento `.text-block` com:

| Atributo | Para que serve |
| --- | --- |
| `id` único | identifica o bloco no SVG e no JSX |
| `data-role` | função: `title`, `subtitle`, `body`, `contact`, `caption` ou `callout` |
| `data-ai-font` | nome PostScript da face no Illustrator, por exemplo `MazzardM-SemiBold` |

- **Quebras de linha explícitas.** O `base.css` usa `white-space: pre`: cada linha do HTML é uma linha da peça. O texto nunca quebra sozinho.
- **Textos longos:** para não calcular as quebras à mão, escrever o bloco numa linha só, com `width` definido e a classe `wrap` (`white-space: normal`). Na exportação, o script mede onde o navegador quebrou cada linha e envia essas quebras como fixas para o SVG e o JSX.
- **Alinhamento:** esquerda, centro ou direita (`text-align`). Para centro ou direita, definir `width`. Sem largura, a caixa tem o tamanho do texto e o alinhamento não aparece.
- **Um estilo por bloco.** Mudou fonte, peso, cor ou tamanho, é outro bloco.

## Exportação

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\export-design.ps1 -Html "<prévia\página.html>" -Svg "<svg\página.svg>" -Jsx "<script\página.jsx>"
```

- Precisa só do PowerShell do Windows e do Chrome. Outro caminho do Chrome pode ser indicado pela variável `CHROME_PATH`.
- O script abre a página no Chrome sem janela, roda `scripts/dom-to-svg.js` e grava os dois arquivos.
- O JSX sai com BOM UTF-8 para o Illustrator ler os acentos, e inclui `scripts/illustrator-text-runtime.jsxinc` por caminho relativo. Não mover a pasta da skill depois de exportar.

### O que o SVG contém

- Grupo `ARTE`: retângulos, imagens vinculadas e vetores embutidos.
- Grupo `TEXTOS_ORIGINAIS`: os textos de origem. Até rodar o JSX, eles aparecem numa fonte genérica, o que é esperado.

### O que o JSX recebe (contrato)

Para cada bloco: `id`, `role`, conteúdo com as quebras, posição e tamanho da caixa em mm, `font` (PostScript), tamanho, entrelinha e tracking em pt/milésimos de em, cor, alinhamento e rotação. As medidas vêm do estilo calculado do navegador, com casas decimais.

## Imagens no Illustrator

Comportamentos do importador de SVG do Illustrator, confirmados no Teste 7:

| Comportamento do Illustrator | Solução no exportador |
| --- | --- |
| Ignora `href` (SVG 2) e mostra o alerta de arquivo vinculado `""`. | Usar `xlink:href` e declarar `xmlns:xlink`. |
| Aplica duas vezes o `x`/`y` de `<image>`. | Posicionar a imagem com `transform="translate(x y)"`. |
| Não respeita `preserveAspectRatio`: a foto vaza da caixa. | Calcular a caixa exata da imagem antes de gravar. |
| Não vincula SVG dentro de SVG. | Embutir logo, grafismos e ícones `.svg` como vetor, com classes e ids prefixados. |

Resultado: PNG/JPG ficam fora do SVG, vinculados pelo caminho relativo real, e o SVG continua leve. Nomes com espaço e parênteses funcionam. Manter a pasta da tarefa inteira.

## Texto no Illustrator

- O JSX confere o nome do documento e as fontes antes de alterar qualquer coisa. Se faltar uma face da Mazzard, ele para e indica qual instalar.
- Remove o grupo `TEXTOS_ORIGINAIS`. Se o Illustrator não preservar o nome do grupo, só remove os textos quando a quantidade bater com o contrato.
- Cria a camada `TEXTO EDITAVEL`, com uma caixa de texto por bloco.
- Cada caixa ganha **3 mm de folga na largura**, distribuída conforme o alinhamento, e **uma entrelinha a mais na altura**. A **hifenização fica desligada**. Sem isso, o Illustrator, que mede o texto um pouco mais largo que o navegador, quebra a última palavra. Se algum bloco ainda quebrar, aumentar `SLACK_WIDTH_MM` no runtime.
- Rodar o JSX uma única vez por SVG recém-aberto. Para refazer, reabrir o SVG.

## Limites conhecidos

- Imagens e textos girados não foram testados no Illustrator.
- A posição vertical da primeira linha segue as regras do Illustrator e pode variar alguns décimos de milímetro em relação à prévia.
- O vínculo depende da estrutura de pastas da tarefa e do caminho da skill continuarem iguais.
