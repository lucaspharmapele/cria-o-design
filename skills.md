# Rascunho da skill de criação de design

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

## Observação validada no Illustrator

Ao abrir o SVG, o Illustrator pode não preservar de forma confiável os nomes dos grupos `SOURCE__...`. Não depender desses nomes para apagar o texto original.

Depois de confirmar que o documento correto está aberto, verificar as fontes necessárias e confirmar que a camada `TEXTO EDITAVEL` ainda não existe, o JSX deve remover todos os `textFrames` importados do SVG antes de criar as caixas corrigidas. O script é destinado ao SVG recém-aberto; não deve ser executado depois que outros textos manuais forem adicionados ao documento.

## Arquitetura mínima

```text
nome da tarefa
  → pasta exclusiva da entrega
  → briefing.md
  → HTML/CSS de tamanho fixo
  → SVG bruto com metadados
  → Illustrator
  → JSX específico para o SVG
  → arte editável
```

O gerador comum deve cuidar da composição e da conversão. O JSX deve conter somente as correções necessárias ao SVG entregue, evitando uma camada genérica antes de existirem casos reais que a justifiquem.

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
