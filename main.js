var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    //console.log(pathname);
    //console.log(queryData);

    if(pathname === '/'){
      if(title === undefined) {
        title = 'Welcome';
      }

      var list;
      fs.readdir('./data',function(error, filelist){
        var i = 0;
        list = '<ol>';
        while(i < filelist.length){
          list = list + `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`;
          i = i + 1;
        }
        list = list + '</ol>';
      });

      fs.readFile(`./data/${title}`,'utf8',function(err, description){
        var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
      });
    } else {
      response.writeHead(404);
      response.end("Not Found");
    }

});
app.listen(3000);
