//import file dependencies for endpoints
const utilities = require('../utilities/utility');
const db = require('../models');


const Links = db.linked_accounts;
const PLinks = db.linked_accountsP;
const SLinks = db.linked_accountsS;

//GET all links endpoint
getAll = async (req, res) =>{
 const links = await Links.findAll({order: ['linkid']});
 res.status(200).json(links);
}

//GET by ID endpoint
getById = async (req, res) =>{
    const id =req.params.id;
    try{
    const link = await Links.findByPk(id);
    if(link==null || link.length==0){
    throw new Error("Unable to find Link Record");
    }
    res.status(200).json(link);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//GET by parent ID endpoint
getByParentApproved = async (req, res) =>{
    const parent =req.params.value;
    try{
    const link = await SLinks.findAll(
    {where: {parentid: parent, status: 'approved'},
    order: [['status', 'DESC']],
    include:[{
        model: db.users,
        attributes: {exclude: ['userid','dob','password','usertype','date_joined']},
        required: true
    }],
    });
    if(link.length==0){
    throw new Error("Unable to find Link request belonging to: " + parent);
    }
    res.status(200).json(link);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
 }

 getByParentPending = async (req, res) =>{
    const parent =req.params.value;
    try{
    const link = await SLinks.findAll(
    {where: {parentid: parent, status: 'pending'},
    order: [['status', 'DESC']],
    include:[{
        model: db.users,
        attributes: {exclude: ['userid','dob','password','usertype','date_joined']},
        required: true
    }],
    });
    if(link.length==0){
    throw new Error("Unable to find Link request belonging to: " + parent);
    }
    res.status(200).json(link);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
 }

 //GET by student ID endpoint
getByStudentPending = async (req, res) =>{
    const student =req.params.value;
    try{
    const link = await PLinks.findAll(
    {where: {studentid: student, status: 'pending'},
    order: [['status', 'DESC']],
    include:[{
        model: db.users,
        attributes: {exclude: ['userid','dob','password','usertype','date_joined',]},
        required: true
    }]
    });
    if(link.length==0){
    throw new Error("Unable to find Link request belonging to: " + student);
    }
    res.status(200).json(link);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
 }

 getByStudentApproved = async (req, res) =>{
    const student =req.params.value;
    try{
    const link = await PLinks.findAll(
    {where: {studentid: student, status: 'approved'},
    order: [['status', 'DESC']],
    include:[{
        model: db.users,
        attributes: {exclude: ['userid','dob','password','usertype','date_joined',]},
        required: true
    }]
    });
    if(link.length===0){
    throw new Error("Unable to find Link request belonging to: " + student);
    }
    res.status(200).json(link);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
 }

//POST endpoint for link creation
create = async (req, res) =>{
    console.log(req.body);
    const link = {
        parentid: req.body.parentid,
        studentid: req.body.studentid,
        status: req.body.status
    };
    console.log(link);
    try{
        //if(!link.parentid || !link.studentid || !link.status){
        //        throw new Error("Essential fields missing");
         //   }
            await Links.create(link);
            res.status(201).json(link);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}



//PUT endpoint for updating existing quiz records
update = async (req, res) => {
    const id = req.body.id;
    const link = {
        parentid: req.body.parentid,
        studentid: req.body.studentid,
        status: req.body.status
    };
    try{
        if(!link.parentid || !link.studentid || !link.status){
            throw new Error("Essential fields missing");
        }
        await Links.update(link, { where: { linkid: id } });
        res.status(200).json(link);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

//DELETE endpoint
deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await Links.destroy({where: { linkid: id }});
        if (deleted==0) {
            throw new Error("Id not found");
         }
         res.status(200).send("Link has been deleted");
    }
   catch(error){
        utilities.formatErrorResponse(res,404,error.message);
   }
}

//export all functions to enable access by other files
module.exports = {getAll, getById, getByParentPending, getByStudentPending, getByParentApproved, getByStudentApproved, create, update, deleting};