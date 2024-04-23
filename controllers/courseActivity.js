//import file dependencies for endpoints
const utilities = require('../utilities/utility');
const db = require('../models');

const CA = db.course_activity;

//GET all endpoint
getAll = async (req, res) =>{
 const ca = await CA.findAll({order: ['id']});
 res.status(200).json(ca);
}

//GET by ID endpoint
getById = async (req, res) =>{
    const id =req.params.id;
    try{
    const ca = await CA.findByPk(id);
    if(ca==null || ca.length==0){
    throw new Error("Unable to find record");
    }
    res.status(200).json(ca);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//GET by username endpoint
getByUser = async (req, res) =>{
    const user =req.params.value;
    try{
    const ca = await CA.findAll(
    {
        where: {userid: user},
    });
    if(ca.length==0){
    throw new Error("Unable to find a User with userID: " + user);
    }
    res.status(200).json(ca);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//GET latest activity by username endpoint
getByUserLast = async (req, res) =>{
    const user =req.params.value;
    try{
    const ca = await CA.findAll(
    {
        where: {userid: user},
        order: [['date', 'DESC']],
        limit: 1
    });
    if(ca.length==0){
    throw new Error("Unable to find a User with userID: " + user);
    }
    res.status(200).json(ca);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//POST endpoint for group creation
create = async (req, res) =>{
    const ca = {
        userid: req.body.userid,
        moduleid: req.body.moduleid,
    };
    try{
        if(!ca.userid || !ca.moduleid){
                throw new Error("Essential fields missing");
            }
            await CA.create(ca);
            res.status(201).json(ca);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}



//DELETE endpoint
deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await CA.destroy({where: { id: id }});
        if (deleted==0) {
            throw new Error("Id not found");
         }
         res.status(200).send("Activity has been deleted");
    }
   catch(error){
        utilities.formatErrorResponse(res,404,error.message);
   }
}

//export all functions to enable access by other files
module.exports = {getAll, getById, getByUser, getByUserLast, create, deleting};