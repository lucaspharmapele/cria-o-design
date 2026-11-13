# Teste: panfleto Clean Therapy

Formato: A5 vertical, `14,8 × 21 cm`, frente e verso.

## Arquivos

- `prévia/frente.html` e `prévia/verso.html`: composições editáveis e visualização no navegador;
- `svg/frente.svg` e `svg/verso.svg`: arquivos para abrir no Illustrator;
- `script/frente.jsx` e `script/verso.jsx`: reconstrução dos blocos de texto de cada lado;
- `apoio/qr-whatsapp.png`: QR Code fornecido pelo usuário para a peça;
- `gerar-svg.js`: extrai novamente o SVG de cada HTML.

Os ícones do teste usam SVGs do projeto [Lucide](https://lucide.dev/) e foram incorporados como caminhos vetoriais. Os originais estão em `../../assets/icons/lucide/`.

Os símbolos do WhatsApp e Instagram usam SVGs do projeto [Simple Icons](https://simpleicons.org/) e estão arquivados com sua licença em `../../assets/icons/simple-icons/`.

## Teste no Illustrator

1. Abra `svg/frente.svg` no Illustrator.
2. Execute `script/frente.jsx` em **Arquivo > Scripts > Outro Script...**.
3. Confirme no alerta se os textos importados foram removidos e 11 caixas foram criadas.
4. Verifique se cada bloco está em uma única caixa de texto na camada `TEXTO EDITAVEL`.
5. Repita com `svg/verso.svg` e `script/verso.jsx`; o esperado é que os textos importados sejam removidos e 13 caixas sejam criadas.

O script deve ser executado sobre o SVG recém-aberto: ele remove todos os textos importados antes de criar a camada `TEXTO EDITAVEL`. Se o arquivo já tiver recebido outros textos manualmente, salve uma cópia antes de executar.

## Limites deste teste

- O nome Pharmapele está representado como texto; não é o logotipo oficial.
- Não foram usadas fotografias, ilustrações ou formas orgânicas.
- Os benefícios são genéricos porque o briefing não trouxe produtos nem claims aprovados.
