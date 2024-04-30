const jwt = require("jsonwebtoken");

module.exports = {
generateAccessToken(userid, username, usertype) {
    const accessToken =  
         jwt.sign(
            {
                "userCreds": {
                    "userid": userid,
                    "username": username,
                    "usertype": usertype
                }
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"}) 
     return accessToken
},

generateRefreshToken(userid, username, usertype) {
    const refreshToken = 
        jwt.sign({
                "userCreds": {
                "userid": userid,
                "username": username,
                "usertype": usertype
            }
        }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"})
    return refreshToken
}, 

validateToken(req, res, next) {
  
    const authHeader = req.headers["authorization"]
 
    if (authHeader == null ) res.sendStatus(400).send("Token not present")

    const token = authHeader.split(" ")[1]
    
    if (token == null) res.sendStatus(401).send("Token not present")

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { 
        res.status(403).send("Token invalid")
        }
        else {
        req.userid = user.userCreds.userid.userid;
        req.username = user.userCreds.userid.username;
        req.usertype = user.userCreds.userid.usertype;
        next() 
        }
    }) 
}
}