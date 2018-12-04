var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    <h2>${title}</h2>
    <p>${body}</p>
  </body>
  </html>
  `;
}

function templateList(filelist){
    var list = '<ol>';
    var i = 0;
    while(i < filelist.length){
      list = list + `<li><a href='/?id=${filelist[i]}'>${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list + '</ol>';
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    console.log("1:"+pathname);

    if(pathname === '/'){
      if(title === undefined) {
        title = 'Welcome';
      }

      var list
      fs.readdir('./data',function(error, filelist){
        list = templateList(filelist);
      });

      fs.readFile(`./data/${title}`,'utf8',function(err, body){
        var template = templateHTML(title, list, body);
        response.writeHead(200);
        response.end(template);
      });
    } else if(pathname === '/create') {
      title = "create";

      var list
      fs.readdir('./data',function(error, filelist){
        list = templateList(filelist);
      });

      fs.readFile(`./html/${title}`,'utf8',function(err, body){
        var template = templateHTML(title, list, body);
        response.writeHead(200);
        response.end(template);
      });
    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
      });
      response.writeHead(200);
      response.end(template);
    } else {
      response.writeHead(404);
      response.end("Not Found");
    }

});
app.listen(3000);
