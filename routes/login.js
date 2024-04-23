require('dotenv').config()

const bcrypt = require("bcrypt");
const mysql = require("mysql");
const { generateAccessToken, generateRefreshToken } = require('./auth/jwt');
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
    const user = req.body.username
    const password = req.body.password

    db.getConnection ( async (err, connection)=> {
    if (err) throw (err)
    const sqlSearch = "Select * from users where username = ?"
    const search_query = mysql.format(sqlSearch,[user])
    await connection.query (search_query, async (err, result) => {
    connection.release()
    
    if (err) throw (err)
    if (result.length == 0) {
    console.log("--------> User does not exist")
    res.sendStatus(404)
    } 
    else {
        const hashedPassword = result[0].password

        if (await bcrypt.compare(password, hashedPassword)) {

            console.log("---------> Login Successful")
            console.log("---------> Generating accessToken")

            const accessToken = generateAccessToken ({user: user})
            const refreshToken = generateRefreshToken ({user: user})
            res.json ({accessToken: accessToken, refreshToken: refreshToken, })
        } 
        else {
            console.log("--------> Password Incorrect")
            res.status(401).send("Password Incorrect!")
        }
    }
})
})
})


module.exports = router;