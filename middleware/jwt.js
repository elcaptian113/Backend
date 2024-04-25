const jwt = require("jsonwebtoken");

export function generateAccessToken(userid, username, usertype) {
    const accessToken =  
         jwt.sign(
            {
                "userCreds": {
                    "userid": userid,
                    "username": username,
                    "usertype": usertype
                }
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "20s"}) 
     return accessToken
}

export function generateRefreshToken(username) {
    const refreshToken = 
        jwt.sign(username, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"})
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
        req.userid = user.userCreds.userid;
        req.username = user.userCreds.username;
        req.usertype = user.userCreds.usertype;
        next() 
        }
    }) 
} 