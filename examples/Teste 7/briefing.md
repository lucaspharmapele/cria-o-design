# Teste 7

## Briefing original

Panfleto com higienização facial na loja, incluindo um qr code para desconto especial

* É para agendamento da revitalização facial em loja
* É para utilizar como foco higienização facial com a nossa linha de skin care (Linha Clean Therapy)
* loja de Paulista
* colocar qr code para o wpp da loja com cta de desconto especial (10%)

### Frente

Você merece um momento de cuidado único.
Ganhe uma revitalização facial gratuita apresentando este cupom na loja.
WPP 81 99559-2532
IG pharmapelepaulista
ENDEREÇO Av. Mal. Floriano Peixoto, 56 - 1A, Paulista

### Verso

Linha vegana Clean Therapy
Ciência e beleza que você sente na pele
produtos e benefícios
rodapé qr code pro wpp 81 99559-2532
CTA ganhe 10%OFF em toda a Linha Clean Therapy.

## Decisões de produção

- Formato fixo: A5 vertical, 14,8 × 21 cm, frente e verso.
- Cinco variações de frente e cinco de verso, criadas do zero (sem reaproveitar layouts dos testes anteriores).
- QR code: reaproveitado o `qr-whatsapp.png` dos testes anteriores, confirmado como correto pelo usuário. Salvo em `apoio/qr-whatsapp.png`.
- Produtos e benefícios: print de copys enviado pelo usuário salvo em `apoio/copys-produtos.png`. Autorizado redigir um texto a partir dele.
- Imagens dos produtos em alta enviadas pelo usuário em `apoio/produtos/` (originais preservados). As prévias usam cópias recortadas na área útil e limitadas a 1800 px de altura, com nomes estáveis: `agua-micelar.png` (de "Água Micelar Oil Free v3"), `gel-limpeza.png`, `espuma-limpeza.png`, `esfoliante-vulcanico.png` (de "BISNAGA"), `tonico-nutritivo.png` e `hidratante-oil-free.png` (de "POTE HIDRA THERAPY voando", liberado pelo usuário).
- "Água Micelar Bifasica v3" não é usada: o print indica a versão Oil Free.
- Foto de modelo enviada pelo usuário (`apoio/elementos/NATALLIA (1).png`) para uso nas frentes; cópia recortada em `apoio/natallia.png`. Na foto ela segura a Água Micelar Bifásica.
- Os 6 produtos entram em todos os versos com imagem e copy completa (abaixo).
- Aprovados pelo usuário: `frente-01` (Cupom destacável) e `verso-02` (Ritual em 4 passos). Exportados para `svg/frente-01.svg`, `svg/verso-02.svg`, `script/frente-01.jsx` e `script/verso-02.jsx` (7 e 32 caixas de texto). Exportação feita com uma porta em PowerShell de `scripts/export-design.js` (mesmo `dom-to-svg.js` e mesmo runtime), porque não há Node na máquina.
- Elementos derivados (logo branco, grafismos e ícones recoloridos) salvos em `apoio/elementos/`, porque o exportador SVG não preserva filtros CSS.

## Copy dos produtos (extraída dos prints enviados pelo usuário)

| Produto | Ativos | Descrição |
| --- | --- | --- |
| Água Micelar | Com ácido hialurônico, niacinamida e prebióticos | Demaquilante com ação 4 em 1: limpa, demaquila, purifica e hidrata. Protege contra a poluição e proporciona uma pele reequilibrada e saudável. |
| Gel de Limpeza | Com niacinamida, prebiótico e PCA-zinco | Fortalece a barreira natural da pele e proporciona uma pele livre de oleosidade, hidratada e saudável. |
| Espuma de Limpeza | Com fucogel, niacinamida e prebióticos | Espuma delicada, com potente ação calmante. Fortalece a barreira natural da pele, protegendo contra a poluição. |
| Esfoliante Vulcânico | Com partículas de minerais vulcânicos | Possui microesferas naturais que fazem uma esfoliação delicada, renovam as células e desobstruem os poros sem agredir a pele. |
| Tônico Nutritivo | Com ác. hialurônico, niacinamida, aminoácidos e simbióticos | Retrai os poros dilatados, finaliza a limpeza facial com agradável sensação de maciez e prepara a pele para um tratamento profundo. |
| Hidratante Nutritivo Oil Free | Com probióticos | Possui textura leve e ultrahidratante que penetra rapidamente na pele. Rico em probióticos e ativos que regeneram o brilho e maciez da pele. |

Ajustes: "particulas" recebeu acento ("partículas"). "ultrahidratante" mantido como no print. Ativos em caixa normal (no print estão em caixa alta).

Rótulos de etapa usados no verso 02 (suposição, não constam no briefing): Limpar, Esfoliar, Tonificar, Hidratar.

Hidratante: a embalagem traz "Hidra Therapy". O usuário liberou o uso da imagem; não foi confirmado se o produto entra nos 10% OFF da Linha Clean Therapy.
- Nesta etapa serão produzidos somente HTML e CSS para aprovação.
