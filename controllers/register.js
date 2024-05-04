const db = require('../models');
const Users = db.users;
const bcrypt = require("bcrypt");


registerHandler = async (req, res) =>{

    const username = req.body.username;
    const fName = req.body.first_name
    const lName = req.body.last_name
    const DOB = req.body.dob
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const accType = req.body.account_type

    if (!username || !password || !DOB || !accType) 
        return res.status(400).json({ 'message': 'Required Fields Missing!.' });
  
    const user = await Users.findAll(
    {
        attributes: ['username'],
        where: {username: username},
    });
    if (user.length == 0){
        //create new account
        const newuser = {
            username: username,
            first_name: fName,
            last_name: lName,
            dob: DOB,
            password: hashedPassword,
            usertype: accType
        };
        try{
            await Users.create(newuser);
            res.status(201).json(newuser);
        }
        catch (error){
            utilities.formatErrorResponse(res,400,error.message);
        }
        
    }
    else{
        res.sendStatus(404);
    }
    }

module.exports = { registerHandler };
