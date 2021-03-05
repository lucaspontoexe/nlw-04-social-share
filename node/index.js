// https://nodejs.org/en/knowledge/HTTP/clients/how-to-access-query-string-parameters/
const http = require('http');
const url = require('url');
const canvas = require('canvas');

http.createServer(async function (req, res) {
  const queryObject = url.parse(req.url,true).query;
  console.log(queryObject);


  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Feel free to add query parameters to the end of the url');
}).listen(8080);

