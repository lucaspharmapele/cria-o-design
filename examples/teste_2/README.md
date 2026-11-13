# Teste 2 — panfleto Clean Therapy

Nova composição A5 vertical criada com DOM HTML real e CSS de tamanho fixo.

## Gerar SVG e JSX

A partir da pasta `criação-design`:

```powershell
node scripts/export-design.js examples/teste_2/prévia/frente.html examples/teste_2/svg/frente.svg examples/teste_2/script/frente.jsx
node scripts/export-design.js examples/teste_2/prévia/verso.html examples/teste_2/svg/verso.svg examples/teste_2/script/verso.jsx
```

O exportador usa o DOM renderizado para gerar o SVG e o JSX a partir do mesmo contrato. O JSX usa o runtime comum em `scripts/illustrator-text-runtime.jsxinc`.

## Finalizar no Illustrator

1. Manter a estrutura de pastas do teste para preservar os vínculos dos ícones e do QR code.
2. Abrir `svg/frente.svg` ou `svg/verso.svg` no Illustrator.
3. Executar o JSX correspondente em `script/`.
4. Conferir a camada `TEXTO EDITAVEL`: a frente deve ter 10 caixas e o verso, 13.
