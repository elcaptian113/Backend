require("dotenv").config()

//declare core varibles and dependencies
const app = require('../app');
const http = require('http');

//assign port varible
const port = process.env.PORT || '8080';
app.set('port', port);

//assign sevrer varible and set port listener
const server = http.createServer(app);
server.listen(port);