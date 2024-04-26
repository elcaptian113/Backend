const Users = require('../models/users');
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require('../middleware/jwt');



loginHandler = async (req, res) =>{

    const username =req.body.username;
    const password =req.body.password;

    if (!username || !password) 
        return res.status(400).json({ 'message': 'Username and password required.' });
  
    const user = await Users.findAll(
    {
        attributes: ['userid','username','usertype'],
        where: {username: username},
    });
    if (user.length == 0){
        res.sendStatus(404);
    }
    else{
        const hashedPassword = result[0].password

        if (await bcrypt.compare(password, hashedPassword)) {

            const accessToken = generateAccessToken ({userid: user.userid, username: user.username, usertype: user.usertype})
            const refreshToken = generateRefreshToken ({userid: user.userid, username: user.username, usertype: user.usertype})

            //create record entry to refresh token table username/token

            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.json ({userid: user.userid, username: user.username, usertype: user.usertype, accessToken: accessToken})
        } 
        else {
            res.status(401).send("Password Incorrect!")
        }
    }
    }

module.exports = { loginHandler };
