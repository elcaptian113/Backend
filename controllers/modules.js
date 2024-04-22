//import file dependencies for endpoints
const utilities = require('../utilities/utility');
const db = require('../models');


const Modules = db.modules;

//GET all endpoint
getAll = async (req, res) =>{
 const modules = await Modules.findAll({order: ['moduleid']});
 res.status(200).json(modules);
}

//GET by ID endpoint
getById = async (req, res) =>{
    const id =req.params.id;
    try{
    const module = await Modules.findByPk(id);
    if(module==null || module.length==0){
    throw new Error("Unable to find Module");
    }
    res.status(200).json(module);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//GET by Subject ID endpoint
getBySubject = async (req, res) =>{
    const subject =req.params.value;
    try{
    const modules = await Modules.findAll(
    {where: {subjectid: subject},
    });
    if(modules.length==0){
    throw new Error("Unable to find Modules belonging to: " + subject);
    }
    res.status(200).json(modules);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
 }

 //GET by Chapter ID endpoint
getByChapter = async (req, res) =>{
    const chapter =req.params.value;
    try{
    const modules = await Modules.findAll(
    {where: {chapterid: chapter},
    });
    if(modules.length==0){
    throw new Error("Unable to find Modules belonging to: " + chapter);
    }
    res.status(200).json(modules);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
 }

//POST endpoint for module creation
create = async (req, res) =>{
    const module = {
        subjectid: req.body.subjectid,
        chapterid: req.body.chapterid,
        module_number: req.body.module_number,
        module_name: req.body.module_name
    };
    try{
        if(!module.subjectid || !module.chapterid || !module.module_number || !module.module_name){
                throw new Error("Essential fields missing");
            }
            await Modules.create(module);
            res.status(201).json(module);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}



//PUT endpoint for updating existing module records
update = async (req, res) => {
    const id = req.body.id;
    const module = {
        subjectid: req.body.subjectid,
        chapterid: req.body.chapterid,
        module_number: req.body.module_number,
        module_name: req.body.module_name
    };
    try{
        if(!module.subjectid || !module.chapterid || !module.module_number || !module.module_name){
            throw new Error("Essential fields missing");
        }
        await Modules.update(module, { where: { moduleid: id } });
        res.status(200).json(module);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

//DELETE endpoint
deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await Modules.destroy({where: { moduleid: id }});
        if (deleted==0) {
            throw new Error("Id not found");
         }
         res.status(200).send("Module has been deleted");
    }
   catch(error){
        utilities.formatErrorResponse(res,404,error.message);
   }
}

//export all functions to enable access by other files
module.exports = {getAll, getById, getByChapter, getBySubject, create, update, deleting};