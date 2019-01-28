var http = require('http');
var fs = require('fs');
let users = require("./users").users;
let server = http.createServer(messageReceived);
server.listen(8080);

function messageReceived(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if(req.method === "GET" && req.url.indexOf("/users/") > -1){
    let id = req.url.split("/");
    let user = users.find(p=>p["id"] == id[2]);
    let userJSON = JSON.stringify(user);
    res.write(userJSON);
  }
  else if(req.method === "GET" && req.url === "/users"){
    let usersJSON = JSON.stringify(users);
    res.write(usersJSON);
  }
  else if(req.method === "POST" && req.url === "/users"){
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      let user = JSON.parse(body);
      user.id = users.length+1;
      users.push(user);
    });
  }
  else if(req.method === "PUT" && req.url.indexOf("/users/") > -1){
    let id = req.url.split("/");
    let user = users.find(p=>p["id"] == id[2]);
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      body = JSON.parse(body);
      user.name = body.name;
    });
  }
  else if(req.method === "DELETE" && req.url.indexOf("/users/") > -1){
    let id = req.url.split("/");
    users.splice(id-1, 1)
  }
  else if(req.method === "GET"){
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    var readStream = fs.createReadStream('./homepage.html', 'utf8');
    readStream.pipe(res);
  } else {
    res.write('not found')    
   }
  // res.end();
} 