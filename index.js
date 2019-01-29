var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// var users = require('./users')

var users = [
  {
      "id": 1,
      "name": "Darwin Risser",
      "instrument": "Clarinet",
      "photo": ""
  },
  {
    "id": 2,
    "name": "Matt Garrison",
    "instrument": "Trumpet",
    "photo": ""
  }
]

app.use(bodyParser.json()) 
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('please choose a path (try /users)')
})

app.get('/users', function (req, res) {
  res.json(users)
})

app.get('/users/instrument/:uInstrument', function (req, res) {
  let u = users.filter(u=>u.instrument === req.params.uInstrument)
  res.json(u)
})

app.post('/users', function (req, res) {
  let newUser = req.body;
  users.push(newUser)
  res.json(newUser)
})

app.listen(3000)




















// basic node.js server without express:

// var http = require('http');
// var fs = require('fs');
// let users = require("./users").users;
// let server = http.createServer(messageReceived);
// server.listen(8080);

// function messageReceived(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   if(req.method === "GET" && req.url.indexOf("/users/") > -1){
//     let id = req.url.split("/");
//     let user = users.find(p=>p["id"] == id[2]);
//     let userJSON = JSON.stringify(user);
//     res.write(userJSON);
//   }
//   else if(req.method === "GET" && req.url === "/users"){
//     let usersJSON = JSON.stringify(users);
//     res.write(usersJSON);
//   }
//   else if(req.method === "POST" && req.url === "/users"){
//     let body = [];
//     req.on('data', (chunk) => {
//       body.push(chunk);
//     }).on('end', () => {
//       body = Buffer.concat(body).toString();
//       let user = JSON.parse(body);
//       user.id = users.length+1;
//       users.push(user);
//     });
//   }
//   else if(req.method === "PUT" && req.url.indexOf("/users/") > -1){
//     let id = req.url.split("/");
//     let user = users.find(p=>p["id"] == id[2]);
//     let body = [];
//     req.on('data', (chunk) => {
//       body.push(chunk);
//     }).on('end', () => {
//       body = Buffer.concat(body).toString();
//       body = JSON.parse(body);
//       user.name = body.name;
//     });
//   }
//   else if(req.method === "DELETE" && req.url.indexOf("/users/") > -1){
//     let id = req.url.split("/");
//     users.splice(id-1, 1)
//   }
//   else if(req.method === "GET"){
//     res.writeHead(200, {'Content-Type': 'text/html'}); 
//     var readStream = fs.createReadStream('./homepage.html', 'utf8');
//     readStream.pipe(res);
//   } else {
//     res.write('not found')    
//    }
//   // res.end();
// } 