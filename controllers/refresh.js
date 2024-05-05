const jwt = require("jsonwebtoken");
//import file dependencies for endpoints
const utilities = require('../utilities/utility');
const db = require('../models');
const { generateAccessToken } = require("../middleware/jwt");

const Users = db.refreshtoken;

//POST endpoint for token record creation
create = async (req, res) =>{
    const user = {
        username: req.body.username,
        token: req.body.token
    };
    try{
        if(!user.username || !user.token){
                throw new Error("Essential fields missing");
            }
            await Users.create(user);
            res.status(201).json(user);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}


//DELETE endpoint
deleting = async (req, res) =>{
    const username =req.body.id;
    console.log(username);
    try{
        const deleted = await Users.destroy({where: { username: username }});
        if (deleted==0) {
            throw new Error("Id not found");
         }
         res.status(200).send("User has been deleted");
    }
   catch(error){
        utilities.formatErrorResponse(res,404,error.message);
   }
}


handleRefresh = async (req, res) => {
   
    const cookies = req.body;
    
    if (!cookies.refreshToken) return res.sendStatus(401);
    const refreshToken = cookies.refreshToken;

    const foundUser = await Users.findAll(
        {
            where: {token: refreshToken},
        });
        if (foundUser.length == 0){
            res.status(400).send("Refresh Token Invalid");
        }
        else{
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err || foundUser.username !== user.userCreds.username) return res.sendStatus(403);
                    
                    const accessToken = generateAccessToken ({userid: user.userCreds.userid, username: user.userCreds.username, usertype: user.userCreds.usertype})

                    res.json({userid: user.userCreds.userid, username: user.userCreds.username, usertype: user.userCreds.usertype, accessToken: accessToken})
                }
            );
        }

}

module.exports = { handleRefresh, create, deleting };