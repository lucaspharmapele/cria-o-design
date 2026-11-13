# Criação de design Pharmapele com HTML, CSS, SVG e Illustrator

## Objetivo

Criar composições gráficas da Pharmapele com HTML e CSS, priorizando a diagramação de texto, e convertê-las em SVG para finalização no Adobe Illustrator.

O SVG será aberto no Illustrator e tratado por um script JSX. Esse script deve corrigir as limitações da conversão e preservar a intenção editorial da composição.

## Fluxo previsto

1. O briefing informa conteúdo, formato, largura, altura e unidade.
2. A composição é criada em HTML e CSS nas dimensões exatas do briefing.
3. O DOM é convertido em SVG.
4. O SVG é aberto no Illustrator.
5. Um script JSX específico para o SVG reorganiza os elementos que não sobreviveram corretamente à conversão.
6. O arquivo permanece editável para a finalização manual.

## Requisitos definidos

- Cada peça possui dimensões fixas e não deve ser responsiva.
- Largura e altura podem ser informadas em pixels ou centímetros.
- Títulos, subtítulos, parágrafos e demais blocos textuais devem permanecer como caixas de texto independentes e editáveis no Illustrator.
- Todas as linhas de um mesmo bloco devem pertencer à mesma caixa de texto.
- A caixa reconstruída deve preservar, tanto quanto o Illustrator permitir, a tipografia e a diagramação definidas no HTML e no CSS.
- As fontes oficiais estarão instaladas no ambiente de geração e na máquina com Illustrator.
- O JSX será executado manualmente dentro do Illustrator depois que o SVG for aberto.

## Estratégia para os textos

O HTML deve identificar explicitamente cada bloco textual. A conversão não deve depender apenas da aparência para descobrir quais linhas pertencem ao mesmo texto.

Cada bloco deve carregar metadados estáveis, como um identificador, sua função e as informações necessárias para o JSX reconstruí-lo. Exemplos de função: título, subtítulo, parágrafo, legenda e chamada.

O contrato exato entre HTML, SVG e JSX será definido no primeiro protótipo. Ele deve contemplar pelo menos:

- conteúdo integral do bloco;
- posição e dimensões da caixa;
- família, peso e tamanho da fonte;
- entrelinha, alinhamento e espaçamento entre caracteres;
- cor e opacidade;
- rotação ou transformação, quando existirem.

## Primeiro protótipo

O primeiro protótipo deve usar uma única peça real, com pelo menos um título de várias linhas e um parágrafo. O objetivo é validar o contrato de metadados e a reconstrução no Illustrator antes de criar uma biblioteca de templates.

Critérios de sucesso:

- o tamanho da prancheta corresponde exatamente ao briefing;
- o SVG reproduz visualmente o HTML;
- cada bloco textual vira uma única caixa editável no Illustrator;
- quebras de linha, estilos, posição e dimensões permanecem coerentes;
- os demais elementos continuam organizados para edição manual.

## Fora do escopo inicial

- layout responsivo;
- biblioteca ampla de templates;
- interface gráfica para montagem;
- identidade visual completa da Pharmapele;
- suporte genérico a outras marcas;
- automação da execução do JSX dentro do Illustrator.

A identidade visual será documentada posteriormente em uma skill separada.
