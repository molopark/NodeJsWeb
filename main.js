var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){
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
    ${control}
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
    var control;

    console.log(`pathname:${pathname}, title:${title}`);

    if(pathname === '/'){
      if(title === undefined) {
        title = 'Welcome';
        control = '<a href="/create">create</a>';
      } else {
        control = `<a href="/create">create</a> <a href="/update?id=${title}">update</a>
                  <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${title}">
                  <input type="submit" value="delete">
                  </form>`;
      }

      fs.readdir('./data',function(error, filelist){
        var list = templateList(filelist);
        fs.readFile(`./data/${title}`,'utf8',function(err, body){
          var template = templateHTML(title, list, body, control);
          response.writeHead(200);
          response.end(template);
        });
      });

    } else if(pathname === '/create') {
      title = "create";

      fs.readdir('./data',function(error, filelist){
        var list = templateList(filelist);
        fs.readFile(`./html/create`,'utf8',function(err, body){
          var template = templateHTML(title, list, body, '');
          response.writeHead(200);
          response.end(template);
        });
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
        fs.writeFile(`./data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location:`/?id=${title}`});
          response.end();
        });
      });
    } else if(pathname === '/update') {
      fs.readdir('./data',function(error, filelist){
        var list = templateList(filelist);
        fs.readFile(`./data/${title}`,'utf8',function(err, description){
/*
          fs.readFile(`./html/update`,'utf8',function(err, body){
            var template = templateHTML(title, list, body, '');
            response.writeHead(200);
            response.end(template);
          });
*/
          var template = templateHTML(title, list, `
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value=${title}>
            <p><input type="text" name="title" placeholder="title" value=${title}></p>
            <p><textarea name="description" placeholder="description">${description}</textarea></p>
            <p><input type="submit"></P>
            </form>`
            , '');
          response.writeHead(200);
          response.end(template);
        });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`./data/${id}`, `./data/${title}`, function(error){
          fs.writeFile(`./data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location:`/?id=${title}`});
            response.end();
          });
        });
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`./data/${id}`, function(err){
          response.writeHead(302, {Location:'/'});
          response.end();
        });
      });
    } else {
      response.writeHead(404);
      response.end("Not Found");
    }

});
app.listen(3000);
