const jwt = require("jsonwebtoken");

export function generateAccessToken(user) {
    const accessToken =  
         jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"}) 
     return accessToken
}

export function generateRefreshToken(user) {
    const refreshToken = 
        jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
    refreshTokens.push(refreshToken)
    return refreshToken
} 

export function validateToken(req, res, next) {
        
    const authHeader = req.headers["authorization"]
    const token = authHeader.split(" ")[1]
    
    if (token == null) res.sendStatus(400).send("Token not present")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) { 
     res.status(403).send("Token invalid")
     }
     else {
     req.user = user
     next() 
     }
    }) 
} 