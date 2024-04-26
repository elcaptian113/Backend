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
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "20s"}) 
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
}