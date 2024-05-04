//import file dependencies for endpoints
const utilities = require('../utilities/utility');
const db = require('../models');

const Users = db.users;

//GET all endpoint
getAll = async (req, res) =>{
 const users = await Users.findAll({order: ['userid']});
 res.status(200).json(users);
}

//GET by ID endpoint
getById = async (req, res) =>{
    const id =req.params.id;
    try{
    const user = await Users.findByPk(id,{
        attributes: {exclude: ['password']}
    }  
    );
    if(user==null || user.length==0){
    throw new Error("Unable to find User");
    }
    res.status(200).json(user);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//GET by username endpoint
getByUsername = async (req, res) =>{
    const username =req.params.value;
    try{
    const user = await Users.findAll(
    {
        where: {username: username},
        attributes: {exclude: ['password']}
    });
    if(user.length==0){
    throw new Error("Unable to find a User with username: " + username);
    }
    res.status(200).json(user);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//POST endpoint for group creation
create = async (req, res) =>{
    const user = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        password: req.body.password,
        usertype: req.body.usertype
    };
    try{
        if(!user.username || !user.first_name || !user.last_name ||
            !user.dob || !user.password || !user.usertype){
                throw new Error("Essential fields missing");
            }
            await Users.create(user);
            res.status(201).json(user);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}



//PUT endpoint for updating existing group records
update = async (req, res) => {
    const id = req.body.id;
    const user = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        password: req.body.password,
        usertype: req.body.usertype
    };
    try {
        if (!user.username || !user.first_name || !user.last_name ||
            !user.dob || !user.password || !user.usertype) {
            throw new Error("Essential fields missing");
        }
        await Users.update(user, { where: { id: id } });
        res.status(200).json(user);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

//DELETE endpoint
deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await Users.destroy({where: { id: id }});
        if (deleted==0) {
            throw new Error("Id not found");
         }
         res.status(200).send("User has been deleted");
    }
   catch(error){
        utilities.formatErrorResponse(res,404,error.message);
   }
}

//export all functions to enable access by other files
module.exports = {getAll, getById, getByUsername, create, update, deleting};