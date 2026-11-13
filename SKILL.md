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

- arquivo HTML da composição;
- estilos CSS usados pela peça;
- SVG convertido nas dimensões do briefing;
- script JSX compatível com esse SVG;
- instrução curta para abrir o SVG e executar o JSX no Illustrator.

## Regras essenciais

1. Criar uma prancheta de tamanho fixo. Não implementar responsividade.
2. Tratar cada título, subtítulo, parágrafo, legenda ou chamada como um bloco textual semântico.
3. Marcar cada bloco com um identificador estável que sobreviva ao SVG ou possa ser associado a ele pelo JSX.
4. Preservar no contrato de conversão o conteúdo completo e os estilos necessários para reconstruir o bloco.
5. Gerar o JSX para reunir as linhas fragmentadas de cada bloco em uma única caixa de texto editável no Illustrator.
6. Manter blocos e níveis hierárquicos diferentes em caixas diferentes. Título, subtítulo, parágrafo, legenda e chamada não devem compartilhar a mesma caixa, mesmo quando aparecem juntos visualmente.
7. Preservar quebras de linha intencionais e a aparência definida no HTML/CSS.
8. Usar as fontes instaladas, sem converter texto em contornos no fluxo normal.
9. Nomear e agrupar elementos de forma útil para a edição manual.
10. Usar ícones na composição sempre que eles ajudarem a identificar uma função, orientar a leitura ou reforçar a hierarquia. Preferir SVGs prontos de bibliotecas reconhecidas e manter o estilo consistente entre os ícones da mesma peça.
11. Sempre que houver um telefone de contato, usar o símbolo oficial ou reconhecível do WhatsApp. Não substituir por balão de conversa, telefone genérico ou outro símbolo que altere o significado.
12. Sempre que houver um perfil do Instagram identificado por `@`, usar também o símbolo oficial ou reconhecível do Instagram. Não substituir por arroba isolada, ícone social genérico ou outro símbolo que altere o significado.
13. Manter o HTML dedicado à composição e à visualização. Não adicionar botão, controle ou script de download/exportação dentro da arte; gerar o SVG diretamente como arquivo do projeto.
14. Fazer verificação visual renderizando temporariamente o HTML ou SVG em imagem fora da pasta do projeto. Inspecionar tipografia, hierarquia, espaçamento, recortes, colisões, contraste e legibilidade e, ao terminar, apagar a imagem temporária.
15. Não salvar prévias PNG, JPG ou outros arquivos raster no projeto, salvo pedido explícito do usuário. Imagens temporárias de verificação não fazem parte dos entregáveis.
16. Validar o resultado com uma peça real antes de generalizar regras ou criar novos templates.
17. Trabalhar primeiro somente no HTML/CSS e apresentá-lo para aprovação. Não gerar SVG nem JSX durante essa etapa. Depois que o HTML for aprovado, gerar o SVG — e o JSX correspondente — somente quando o usuário solicitar explicitamente.

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
- caixas separadas para títulos, subtítulos, parágrafos, legendas e chamadas;
- família, peso, tamanho, cor, entrelinha e alinhamento;
- quebras de linha e limites da caixa;
- uso correto de ícones, incluindo o símbolo do WhatsApp junto a telefones de contato;
- organização dos demais objetos.

Os detalhes da identidade visual, incluindo fontes, paleta, grafismos e regras de marca, devem ser obtidos futuramente por meio da skill de identidade visual da Pharmapele.
