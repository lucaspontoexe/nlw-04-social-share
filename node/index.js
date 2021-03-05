// https://nodejs.org/en/knowledge/HTTP/clients/how-to-access-query-string-parameters/
const http = require('http');
const url = require('url');
const {loadImage, registerFont, createCanvas} = require('canvas');
const Box = require('./Box');
const colors = require('./colors');

http.createServer(async function (req, res) {
  const queryObject = url.parse(req.url,true).query;
  console.log(queryObject);


  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Feel free to add query parameters to the end of the url');
}).listen(8080);


async function drawCanvas() {
    registerFont('./Inter.ttf', {family: 'Inter'});
    const moveitLogo = await loadImage('./Logo.svg');
    const leafL = await loadImage('./leaf-L.svg');
    const leafR = await loadImage('./leaf-R.svg');

    
}