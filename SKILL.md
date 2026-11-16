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
8. Usar as fontes instaladas, sem converter texto em contornos no fluxo normal.
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

## Referências

- Para o fluxo técnico, leia [references/fluxo-html-svg-illustrator.md](references/fluxo-html-svg-illustrator.md).
- Para as regras visuais da Pharmapele, leia [references/marca-pharmapele.md](references/marca-pharmapele.md).

## Texto no Illustrator

O exportador deve agrupar os textos de origem em `TEXTOS_ORIGINAIS`. O JSX tenta remover seletivamente esse grupo antes de reconstruir as caixas.

Como o Illustrator pode não preservar nomes de grupos, o runtime pode usar fallback somente no SVG recém-aberto: confirmar o nome do documento, verificar as fontes, garantir que `TEXTO EDITAVEL` ainda não existe e aceitar a remoção dos `textFrames` apenas quando a contagem corresponder ao contrato exportado. Se a contagem divergir, interromper sem remover nada.

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

Usar `scripts/export-design.js` para converter o DOM renderizado em SVG e gerar o JSX a partir do mesmo contrato. Usar `scripts/illustrator-text-runtime.jsxinc` como runtime comum; cada JSX de página deve conter somente configuração e blocos textuais.

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
- organização dos demais objetos.

Os detalhes da identidade visual, incluindo fontes, paleta, grafismos e regras de marca, devem ser obtidos futuramente por meio da skill de identidade visual da Pharmapele.
