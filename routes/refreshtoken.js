var express = require('express');
const { generateAccessToken, generateRefreshToken, refreshTokens } = require('./auth/jwt');
var router = express.Router();


app.post("/", (req,res) => {
    if (!refreshTokens.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")
        refreshTokens = refreshTokens.filter( (c) => c != req.body.token)

    const accessToken = generateAccessToken({user: req.body.username})
    const refreshToken = generateRefreshToken({user: req.body.username})

    res.json ({accessToken: accessToken, refreshToken: refreshToken})
})

module.exports = router;