---
name: criacao-design
description: Criar peças gráficas fixas da Pharmapele em HTML/CSS, exportá-las para SVG e gerar JSX para reconstruir textos editáveis no Adobe Illustrator.
---

# Criação de design

## Propósito

Orientar a criação de peças gráficas da Pharmapele em HTML e CSS, convertê-las para SVG e gerar o JSX necessário para recuperar a editabilidade dos blocos de texto no Adobe Illustrator.

## Quando usar

Usar quando o pedido for criar uma composição gráfica da Pharmapele destinada à exportação em SVG e à finalização no Illustrator.

Não usar para definir a identidade visual da marca. Essa responsabilidade pertencerá a outra skill.

## Entradas obrigatórias

- nome completo da tarefa, preferencialmente no padrão do Trello `#ID - Nome da tarefa`;
- briefing e textos da peça;
- largura e altura;
- unidade: `px` ou `cm`.

Antes de iniciar qualquer trabalho, perguntar obrigatoriamente o nome da tarefa. Não criar HTML, SVG, JSX ou outros arquivos da peça enquanto esse nome não tiver sido informado.

Criar uma pasta exclusiva com o nome completo da tarefa para centralizar todos os arquivos da entrega. Preservar o padrão `#ID - Nome da tarefa`; substituir somente caracteres que não sejam permitidos pelo sistema de arquivos do Windows.

Usar obrigatoriamente esta estrutura:

```text
#ID - Nome da tarefa/
├── briefing.md
├── apoio/
├── prévia/
│   ├── frente.html
│   └── verso.html
├── svg/
└── script/
```

Guardar em `apoio/` os materiais específicos da demanda, como fotos, QR codes, logos e referências. Guardar somente os HTMLs de aprovação em `prévia/`, os SVGs solicitados em `svg/` e os JSX correspondentes em `script/`.

Quando o briefing for informado, salvar seu texto em `briefing.md` dentro da pasta da tarefa antes de iniciar a composição. Preservar o conteúdo original e separar claramente quaisquer decisões, correções ou suposições acrescentadas durante o trabalho.

Se largura, altura ou unidade estiverem ausentes e não puderem ser inferidas com segurança, solicitar ao usuário antes de gerar a peça.

## Entregáveis

Na etapa inicial, entregar somente:

- arquivo HTML da composição;
- estilos CSS usados pela peça.

Depois da aprovação explícita do HTML e somente quando o usuário solicitar a exportação, entregar:

- SVG convertido nas dimensões do briefing;
- script JSX compatível com esse SVG;
- instrução curta para abrir o SVG e executar o JSX no Illustrator.

## Regras essenciais

1. Criar uma prancheta de tamanho fixo. Não implementar responsividade.
2. Tratar cada título, subtítulo, corpo, contato, legenda e chamada como um bloco textual semântico distinto. Usar funções explícitas como `title`, `subtitle`, `body`, `contact`, `caption` e `callout`.
3. Marcar cada bloco com um identificador estável que sobreviva ao SVG ou possa ser associado a ele pelo JSX.
4. Preservar no contrato de conversão o conteúdo completo e os estilos necessários para reconstruir o bloco.
5. Gerar o JSX para reunir as linhas fragmentadas de cada bloco em uma única caixa de texto editável no Illustrator.
6. Manter blocos e níveis hierárquicos diferentes em caixas diferentes. Título, subtítulo, corpo, contato, legenda e chamada não devem compartilhar a mesma caixa, mesmo quando aparecem juntos visualmente.
7. Preservar quebras de linha intencionais e a aparência definida no HTML/CSS.
8. Usar exclusivamente a família Mazzard, sem converter texto em contornos no fluxo normal. No HTML, carregar os OTF de `assets/fonts/mazzard/` por `@font-face`, para a prévia nunca cair em outra fonte. No Illustrator, o JSX usa a Mazzard instalada no sistema; se alguma face não estiver instalada, o JSX interrompe sem alterar nada e indica qual falta. Nesse caso, orientar o usuário a instalar as faces de `assets/fonts/mazzard/` (clique direito no arquivo `.otf` → Instalar), reiniciar o Illustrator e rodar o JSX de novo.
9. Nomear e agrupar elementos de forma útil para a edição manual.
10. Usar artisticamente os SVGs exclusivos da marca apenas como decoração, grafismo de fundo ou apoio visual. Para itens, listas, benefícios, etapas e contatos, usar SVGs funcionais de bibliotecas reconhecidas, como Lucide ou Simple Icons. Manter consistente o estilo dos ícones funcionais da mesma peça.
11. Sempre que houver um telefone de contato, usar o símbolo oficial ou reconhecível do WhatsApp. Não substituir por balão de conversa, telefone genérico ou outro símbolo que altere o significado.
12. Sempre que houver um perfil do Instagram identificado por `@`, usar também o símbolo oficial ou reconhecível do Instagram. Não substituir por arroba isolada, ícone social genérico ou outro símbolo que altere o significado.
13. Manter o HTML dedicado à composição e à visualização. Não adicionar botão, controle ou script de download/exportação dentro da arte; gerar o SVG diretamente como arquivo do projeto.
14. Fazer verificação visual renderizando temporariamente o HTML ou SVG em imagem fora da pasta do projeto. Inspecionar tipografia, hierarquia, espaçamento, recortes, colisões, contraste e legibilidade e, ao terminar, apagar a imagem temporária.
15. Não salvar prévias PNG, JPG ou outros arquivos raster no projeto, salvo pedido explícito do usuário. Imagens temporárias de verificação não fazem parte dos entregáveis.
16. Validar o resultado com uma peça real antes de generalizar regras ou criar novos templates.
17. Trabalhar primeiro somente no HTML/CSS e apresentá-lo para aprovação. Não gerar SVG nem JSX durante essa etapa. Depois que o HTML for aprovado, gerar o SVG — e o JSX correspondente — somente quando o usuário solicitar explicitamente.
18. Dimensionar a tipografia para o tamanho físico final da peça, não para a ampliação na tela. Aplicar os limites calibrados na impressão: corpo com mínimo de `8 pt`; contatos com mínimo de `10 pt`; legendas com mínimo de `10 pt`; chamadas com mínimo de `10 pt`; subtítulos com mínimo de `10 pt`. Não reduzir textos abaixo desses limites para fazê-los caber; reorganizar a composição.
19. Verificar legibilidade e contraste de cada bloco no fundo efetivo. Sobre os dois azuis oficiais, usar texto branco; não usar cinza, azul-claro, azul-escuro ou outro tom de baixo contraste. Se o branco não ficar suficientemente legível sobre o azul-claro, mover o texto para uma área branca ou azul-escura, aumentar sua escala ou reorganizar a composição em vez de trocar por outra cor de baixo contraste. Sobre branco, usar `#005095` ou neutro escuro.
20. Preservar a copy do briefing. É permitido alterar quebras de linha, caixa, pontuação e distribuição entre blocos, mas não substituir, resumir ou inventar chamadas principais sem aprovação explícita. Antes de apresentar a prévia, comparar todos os textos com `briefing.md`.
21. Não tratar contato como texto de corpo. Contatos precisam de destaque próprio e devem usar uma tipografia de caráter mais próximo aos elementos de destaque, sem necessariamente repetir a fonte, o peso ou a escala do título. Preferir Mazzard H em peso moderado ou Mazzard M Semi Bold/Bold, conforme a composição.
22. Não agrupar legenda e chamada como uma única categoria tipográfica. Ambas têm mínimo de `10 pt`, mas podem usar subfamílias, pesos, caixa, espaçamento e tratamentos diferentes conforme suas funções: legenda identifica ou explica; chamada orienta a ação ou conduz a leitura.
23. Tratar os tamanhos mínimos apenas como pisos de legibilidade, não como tamanhos padrão. Quando um bloco tiver pouco texto e uma área ampla, ampliar a tipografia e rever largura da caixa, quebras de linha e entrelinha para que o conteúdo participe melhor da mancha gráfica. Evitar texto pequeno perdido em caixas grandes e não tentar preencher o espaço apenas com tracking excessivo. Preservar espaço vazio quando ele for intencional e não ampliar a ponto de romper a hierarquia da composição.
24. Quando um texto não couber, corrigir nesta ordem: reposicionar o bloco, ampliar sua área, ajustar a entrelinha, rever a composição e só então criar quebras editoriais intencionais. Não reduzir abaixo do mínimo. Manter telefones, perfis e endereços semanticamente íntegros na mesma caixa e evitar quebras causadas apenas por falta de espaço.
25. Depois de qualquer alteração global de cor ou tipografia, repetir a verificação visual de todas as páginas. Não recolorir automaticamente elementos que já estejam visualmente aprovados.
26. Inserir toda imagem, logo, grafismo e ícone como `<img class="asset">` posicionado diretamente na `.artboard`, com caminho relativo para um arquivo local da tarefa (`apoio/`) ou do acervo (`assets/`). Não usar `background-image`, `<svg>` inline, filtros CSS nem `mix-blend-mode`: o exportador não os converte. Para mudar a cor de um SVG, salvar uma cópia recolorida em `apoio/elementos/`.
27. Gerar o SVG sempre por `scripts/export-design.ps1`, nunca à mão: são eles que aplicam as regras de vínculo descritas em "Imagens no Illustrator".

## Referências

- Para o fluxo técnico, leia [references/fluxo-html-svg-illustrator.md](references/fluxo-html-svg-illustrator.md).
- Para as regras visuais da Pharmapele, leia [references/marca-pharmapele.md](references/marca-pharmapele.md).

## Texto no Illustrator

Como as quebras de linha vêm explícitas do HTML, o runtime cria cada caixa com folga de 3 mm na largura (estendida conforme o alinhamento) e de uma entrelinha na altura, e desliga a hifenização. Sem isso, o Illustrator, que mede o texto um pouco mais largo que o navegador e hifeniza por padrão, quebra a última palavra e deixa texto oculto. O exportador mede as caixas com valores fracionários do estilo calculado, não com `offsetWidth`, que arredonda para pixel inteiro.

Alinhamentos aceitos: esquerda, centro e direita (`text-align: left`, `center` ou `right`). Para centralizar ou alinhar à direita, definir `width` na caixa do HTML: sem largura, a caixa tem o tamanho do texto e o alinhamento não aparece. O SVG e o JSX recebem o mesmo alinhamento, e a folga da caixa é distribuída de acordo com ele.

O exportador deve agrupar os textos de origem em `TEXTOS_ORIGINAIS`. O JSX tenta remover seletivamente esse grupo antes de reconstruir as caixas.

Como o Illustrator pode não preservar nomes de grupos, o runtime pode usar fallback somente no SVG recém-aberto: confirmar o nome do documento, verificar as fontes, garantir que `TEXTO EDITAVEL` ainda não existe e aceitar a remoção dos `textFrames` apenas quando a contagem corresponder ao contrato exportado. Se a contagem divergir, interromper sem remover nada.

## Imagens no Illustrator

Comportamentos do importador de SVG do Illustrator, confirmados no Teste 7, e como `scripts/dom-to-svg.js` os contorna:

| Comportamento do Illustrator | Solução no exportador |
| --- | --- |
| Ignora `href` (SVG 2) e mostra o alerta de arquivo vinculado `""`. | Usar `xlink:href` e declarar `xmlns:xlink` no `<svg>`. |
| Aplica duas vezes o `x`/`y` de `<image>`, deslocando a imagem para o dobro da distância. | Gravar `<image>` sem `x`/`y` e posicionar com `transform="translate(x y)"`. |
| Não respeita `preserveAspectRatio`: a foto vaza da caixa quando a proporção difere. | Calcular a caixa exata da imagem (equivalente a `object-fit: contain`) antes de gravar. |
| Não vincula SVG dentro de SVG (mostra caixa com X). | Embutir logo, grafismos e ícones `.svg` como vetor editável, com classes e ids prefixados por asset. |

Resultado: PNG/JPG ficam fora do SVG, vinculados pelo caminho relativo real (por exemplo `../apoio/natallia.png`), e o SVG continua leve. Nomes com espaço e parênteses funcionam. Manter a pasta da tarefa inteira para os vínculos não quebrarem.

## Arquitetura mínima

```text
nome da tarefa
  → pasta exclusiva da entrega
  → briefing.md
  → apoio/
  → prévia/ com HTML/CSS de tamanho fixo
  → aprovação explícita do HTML
  → solicitação explícita de exportação
  → svg/ com SVG bruto e metadados
  → Illustrator
  → script/ com JSX específico para o SVG
  → arte editável
```

Usar `scripts/export-design.ps1 -Html <página.html> -Svg <saída.svg> -Jsx <saída.jsx>` para converter o DOM renderizado em SVG e gerar o JSX a partir do mesmo contrato. Ele roda no PowerShell do Windows com o Chrome, sem outras dependências, e usa `scripts/dom-to-svg.js` dentro do navegador. Usar `scripts/illustrator-text-runtime.jsxinc` como runtime comum; cada JSX de página deve conter somente configuração e blocos textuais.

## Validação do primeiro caso

Antes de considerar a skill pronta, verificar no Illustrator:

- dimensões da prancheta;
- correspondência visual com o HTML;
- uma caixa editável por bloco textual;
- caixas separadas para títulos, subtítulos, corpos, contatos, legendas e chamadas;
- família, peso, tamanho, cor, entrelinha e alinhamento;
- quebras de linha e limites da caixa;
- uso correto de ícones, incluindo o símbolo do WhatsApp junto a telefones de contato;
- tamanho físico mínimo dos textos para impressão;
- ocupação óptica dos blocos e equilíbrio da mancha gráfica;
- contraste de cada texto contra seu fundo efetivo;
- fidelidade da copy ao briefing;
- imagens PNG/JPG listadas como vinculadas no painel Vínculos, sem alerta de vínculo ausente, nas mesmas posições e proporções do HTML;
- logo, grafismos e ícones presentes como vetor;
- organização dos demais objetos.

Os detalhes da identidade visual, incluindo fontes, paleta, grafismos e regras de marca, devem ser obtidos futuramente por meio da skill de identidade visual da Pharmapele.
