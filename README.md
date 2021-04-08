# nlw-04-social-share
![Thumbnail do Protótipo](.github/)
Prova de conceito de um gerador de imagens para Open Graph usando canvas.
As imagens poderiam ser usadas como _thumbnail_ para links compartilhados em redes sociais.

## `node`
![Thumbnail feita pelo node-canvas](.github/node-canvas.png)

Imagem é gerada no servidor usando node-canvas. Por [problemas de fontes da biblioteca](https://github.com/Automattic/node-canvas/issues/331), a imagem não fica igual à do protótipo.
O servidor pode ser iniciado acessando `http://localhost:8080/`.

## `browser`
![Thumbnail feita no navegador](.github/browser-canvas.png)

Imagem é gerada no navegador, usando `<canvas>`. A imagem fica idêntica à do protótipo. Uma ferramenta como Pupeteer seria necessária para que isso acontecesse no back-end, o que talvez não seja a solução ideal.