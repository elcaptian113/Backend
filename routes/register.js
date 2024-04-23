require('dotenv').config()

const bcrypt = require("bcrypt");
const mysql = require("mysql");
var express = require('express');
var router = express.Router();


const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_DATABASE,
   port: DB_PORT
})

app.post("/", async (req,res) => {

    const user = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    //add in all user details here


    db.getConnection( async (err, connection) => {
    if (err) throw (err) 

    const sqlSearch = "SELECT * FROM users WHERE username = ?"
    const search_query = mysql.format(sqlSearch,[user])
    const sqlInsert = "INSERT INTO users VALUES (NULL,?,?)"
    const insert_query = mysql.format(sqlInsert,[user, hashedPassword])

    await connection.query (search_query, async (err, result) => {
        if (err) throw (err)
        if (result.length != 0) {
        connection.release()
        res.sendStatus(409) 
        } 
        else {
        await connection.query (insert_query, (err, result)=> {
        connection.release()
        if (err) throw (err)
        res.sendStatus(201)
        })
    }
    })
    })
}) 

module.exports = router;