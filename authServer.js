require("dotenv").config()

const express = require('express');
const app = express();
const bcrypt = require("bcrypt")
const mysql = require("mysql")
const jwt = require("jsonwebtoken")

app.use(express.json());

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

app.post("/register", async (req,res) => {
    const user = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    db.getConnection( async (err, connection) => {
     if (err) throw (err)

     const sqlSearch = "SELECT * FROM users WHERE username = ?"
     const search_query = mysql.format(sqlSearch,[user])
     const sqlInsert = "INSERT INTO users VALUES (NULL,?,?)"
     const insert_query = mysql.format(sqlInsert,[user, hashedPassword])

     await connection.query (search_query, async (err, result) => {
        if (err) throw (err)
        console.log("------> Search Results")
        console.log(result.length)
        if (result.length != 0) {
         connection.release()
         console.log("------> User already exists")
         res.sendStatus(409) 
        } 
        else {
         await connection.query (insert_query, (err, result)=> {
         connection.release()
         if (err) throw (err)
         console.log ("--------> Created new User")
         console.log(result.insertId)
         res.sendStatus(201)
        })
       }
      })
      })
      }) 


    function generateAccessToken(user) {
        return 
            jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"}) 
    }

    let refreshTokens = []

    function generateRefreshToken(user) {
        const refreshToken = 
            jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
        refreshTokens.push(refreshToken)
        return refreshToken
    }

app.post("/login", async (req,res) => {
    const user = req.body.username
    const password = req.body.password

    db.getConnection ( async (err, connection)=> {
    if (err) throw (err)
    const sqlSearch = "Select * from userTable where user = ?"
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
            res.json ({accessToken: accessToken, refreshToken: refreshToken})
        } 
        else {
            console.log("--------> Passowrd Incorrect")
            res.status(401).send("Password Incorrect!")
        }
    }
   })
 })
})

app.post("/refreshToken", (req,res) => {
    if (!refreshTokens.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")
    refreshTokens = refreshTokens.filter( (c) => c != req.body.token)

    const accessToken = generateAccessToken ({user: req.body.username})
    const refreshToken = generateRefreshToken ({user: req.body.username})

    res.json ({accessToken: accessToken, refreshToken: refreshToken})
    })

app.delete("/logout", (req,res)=>{
    refreshTokens = refreshTokens.filter( (c) => c != req.body.token)

    res.status(204).send("Logged out!")
    })

    const port = process.env.TOKEN_SERVER_PORT;

    app.listen(port, () => {
        console.log('Auth server connected. Port: ' + port)
    })