# Identidade visual da Pharmapele

Este documento registra as regras visuais que orientarão as composições. Ele complementa, mas não substitui, o manual oficial da marca.

## Essência da marca

- Personalidade: científica, humana, sofisticada, acolhedora e inovadora.
- Percepção desejada: clareza, limpeza e feminilidade.
- Elementos centrais: logotipo, azul, bastante espaço branco e presença feminina.
- Público principal: definido pelo briefing.

## Elementos de design

- Usar os grafismos, ícones, imagens e demais elementos oficiais disponíveis no acervo.
- Preferir ícones prontos e reconhecíveis, obtidos como código em bibliotecas como [Icones.js](https://icones.js.org/) e fontes similares.
- Não gerar ícones SVG novos com o modelo quando houver um ícone pronto adequado.
- Sobreposições e transparências são permitidas.
- Sombras e degradês não devem ser produzidos no HTML; quando necessários, devem ser feitos no Illustrator.
- Formas orgânicas também devem ser criadas apenas na etapa de finalização no Illustrator.

### Acervo

Adicionar logotipos, grafismos, ícones SVG e imagens PNG ou JPG em:

`C:\Users\eduardoalbuquerque\Documents\ChatGPT\AJUSTES RÁPIDOS\criação-design\assets\brand`

Antes de criar uma peça, consultar esse acervo e reutilizar os elementos apropriados.

## Cores

### Paleta principal

| Cor | HEX | RGB | Uso aproximado |
| --- | --- | --- | --- |
| Azul claro | `#2288c9` | `34, 136, 201` | 80% dos elementos azuis; títulos, blocos e elementos-chave |
| Azul escuro | `#163d6c` | `22, 61, 108` | 20% dos elementos azuis; títulos, blocos e elementos-chave |

- Usar fundos neutros e claros, normalmente brancos ou cinza-claro.
- Fundos inteiramente azuis são permitidos quando o briefing justificar, usando um dos dois tons oficiais.
- O briefing pode alterar a densidade e a distribuição das cores.
- Não há combinações reservadas ou proibidas definidas neste momento.
- Degradê para transparência é permitido, mas deve ser aplicado no Illustrator, nunca gerado no HTML.
- O tom exato do cinza-claro ainda não foi definido.
- Valores CMYK ainda precisam ser fornecidos ou confirmados pelo material oficial.

## Formas e composição

- Usar geometria predominantemente retangular.
- Preferir cantos retos.
- Cerca de 20% dos retângulos podem usar cantos arredondados de `10px`, quando isso favorecer a composição.
- Criar composições normalmente limpas e espaçosas; o briefing pode pedir maior densidade.
- Valorizar espaço branco.
- Alinhamento, hierarquia, sobreposição e densidade podem variar conforme o formato e o briefing.
- Não gerar formas orgânicas no HTML.

## Tipografia

Usar exclusivamente a família Mazzard. As subfamílias H, M e L podem ser usadas com todos os pesos e respectivas versões em itálico:

- Thin;
- Extra Light;
- Light;
- Regular;
- Medium;
- Semi Bold;
- Bold;
- Extra Bold;
- Black.

### Arquivos e nomes verificados

Em 13 de novembro de 2026, o acervo `assets/fonts/mazzard/` continha 54 arquivos OTF: 18 faces de Mazzard H, 18 de Mazzard M e 18 de Mazzard L. Cada subfamília possui Thin, Extra Light, Light, Regular, Medium, Semi Bold, Bold, Extra Bold e Black, com versões normal e itálica.

Os metadados internos dos arquivos usam:

- família tipográfica: `Mazzard`;
- faces: `H Regular`, `M SemiBold`, `L Black Italic` e equivalentes;
- nomes PostScript: `MazzardH-Regular`, `MazzardM-SemiBold`, `MazzardL-BlackItalic` e equivalentes;
- famílias do Windows: `Mazzard H`, `Mazzard M` e `Mazzard L` para Regular, Italic, Bold e Bold Italic; os demais pesos aparecem em famílias separadas, como `Mazzard M Medium`.

No HTML, carregar os OTF do acervo com regras `@font-face` explícitas e nomes de família controlados pelo projeto. Não depender dos nomes de fontes instaladas no Windows.

No JSX, usar o nome PostScript exato da face ao atribuir a fonte no Illustrator. A correspondência deve seguir `Mazzard` + subfamília + peso + `Italic` quando aplicável, sem espaços; por exemplo, `MazzardM-SemiBoldItalic`.

Exceção conhecida: `MazzardL-Regular.otf` declara peso OpenType `300`, o mesmo valor de `MazzardL-Light.otf`. No CSS do projeto, mapear explicitamente L Regular como `400` e L Light como `300`, usando arquivos separados, e confirmar visualmente no primeiro protótipo.

As 54 faces do acervo também estão instaladas para o usuário atual do Windows. O HTML deve continuar usando os arquivos do projeto para que a renderização não dependa dessa instalação local.

### Uso

- Títulos: usar caixa alta.
- Escolher subfamília, peso, entrelinha e espaçamento com base na hierarquia e no briefing, sem uma combinação fixa por função.
- Alinhamento varia conforme o briefing.
- Destaques, preços, percentuais, produtos, números e unidades podem receber tratamento próprio quando o briefing ou o produto pedirem.
- Não usar fontes alternativas.

## Fotografia

- Tema, pessoas, perfis, expressões, poses, enquadramento, cenário, contraste e acabamento dependem do briefing.
- Preferir iluminação clara como direção geral.
- Manter temperatura de cor neutra.
- Posicionar textos preferencialmente sobre áreas vazias da imagem.
- Imagens geradas por IA são permitidas apenas quando houver referências visuais suficientes para orientar o resultado.
- Evitar pessoas pouco atraentes para o contexto publicitário, aparência suja, artificialidade visual e retoque excessivo.
- Evitar pele plástica, anatomia inconsistente, expressões artificiais e outros sinais evidentes de geração ou manipulação.

## Logotipo

- Usar somente os arquivos oficiais que forem adicionados ao acervo.
- Versão preferencial, área de proteção, tamanho mínimo, fundos permitidos e aplicações proibidas ainda precisam ser documentados.

## Referências

- Manual oficial: aguardando inclusão no acervo.
- Pasta de logos e elementos: `assets/brand/`.
- Fontes: família Mazzard instalada para o usuário atual.
- Peças aprovadas como referência: serão fornecidas posteriormente.
- Desconsiderar peças anteriores que fujam do rebranding atual.

## Pendências

- Receber e catalogar o acervo visual.
- Validar no navegador e no Illustrator os nomes efetivos das fontes Mazzard.
- Definir o cinza-claro padrão e os valores CMYK oficiais.
- Documentar as regras de uso do logotipo.
- Adicionar peças aprovadas do rebranding como referência.
