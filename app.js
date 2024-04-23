require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout')
const refreshRouter = require('./routes/refreshtoken')
const loginRouter = require ('./routes/login');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.get("/", (req, res) => {
    res.json( "Geek2Me REST API");
    })

//set url routes
app.use("/public", express.static(__dirname + '/public'));
app.use("/users", usersRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/refresh", refreshRouter);


app.use((req, res) =>
 res.status(404).send("Sorry page not found!"));
 
module.exports = app;