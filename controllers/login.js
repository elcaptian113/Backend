
const db = require('../models');
const Users = db.users;
const rToken = db.refreshtoken;
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require('../middleware/jwt');



loginHandler = async (req, res) =>{

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) 
        return res.status(400).json({ 'message': 'Username and password required.' });
  
    const user = await Users.findAll(
    {
        attributes: ['userid','username','usertype','password'],
        where: {username: username},
    });
    if (user.length == 0){
        res.sendStatus(404);
    }
    else{
        const hashedPassword = user[0].password;


        if (await bcrypt.compare(password, hashedPassword)) {

            const accessToken = generateAccessToken ({userid: user[0].userid, username: user[0].username, usertype: user[0].usertype});
            const refreshToken = generateRefreshToken ({userid: user[0].userid, username: user[0].username, usertype: user[0].usertype});


            const userRefreshToken = {
                username: user[0].username,
                token: refreshToken
            };

            await rToken.create(userRefreshToken);
            //res.status(201).json(userRefreshToken);
 

        
            res.json ({userid: user[0].userid, username: user[0].username, usertype: user[0].usertype, accessToken: accessToken, refreshToken: refreshToken});
        } 
        else {
            res.status(401).send("Password Incorrect!")
        }
    }
    }

module.exports = { loginHandler };
