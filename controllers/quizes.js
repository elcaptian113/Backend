//import file dependencies for endpoints
const utilities = require('../utilities/utility');
const db = require('../models');


const Quizes = db.quizes;

//GET all quizes endpoint
getAll = async (req, res) =>{
 const quizes = await Quizes.findAll({order: ['quizid']});
 res.status(200).json(quizes);
}

//GET by ID endpoint
getById = async (req, res) =>{
    const id =req.params.id;
    try{
    const quiz = await Quizes.findByPk(id);
    if(quiz==null || quiz.length==0){
    throw new Error("Unable to find Module");
    }
    res.status(200).json(quiz);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//GET by Module ID endpoint
getByModule = async (req, res) =>{
    const module =req.params.value;
    try{
    const quiz = await Quizes.findAll(
    {where: {moduleid: module},
    });
    if(quiz.length==0){
    throw new Error("Unable to find Quizes belonging to: " + module);
    }
    res.status(200).json(quiz);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
 }


//POST endpoint for quiz creation
create = async (req, res) =>{
    const quiz = {
        moduleid: req.body.moduleid
    };
    try{
        if(!quiz.moduleid){
                throw new Error("Essential fields missing");
            }
            await Quizes.create(quiz);
            res.status(201).json(quiz);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}



//PUT endpoint for updating existing quiz records
update = async (req, res) => {
    const id = req.body.id;
    const quiz = {
        moduleid: req.body.moduleid
    };
    try{
        if(!quiz.moduleid){
            throw new Error("Essential fields missing");
        }
        await Quizes.update(quiz, { where: { quizid: id } });
        res.status(200).json(quiz);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

//DELETE endpoint
deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await Quizes.destroy({where: { quizid: id }});
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
module.exports = {getAll, getById, getByModule, create, update, deleting};