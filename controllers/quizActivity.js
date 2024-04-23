//import file dependencies for endpoints
const utilities = require('../utilities/utility');
const db = require('../models');

const QA = db.quiz_activity;

//GET all endpoint
getAll = async (req, res) =>{
 const qa = await QA.findAll({order: ['id']});
 res.status(200).json(qa);
}

//GET by ID endpoint
getById = async (req, res) =>{
    const id =req.params.id;
    try{
    const qa = await QA.findByPk(id);
    if(qa==null || qa.length==0){
    throw new Error("Unable to find record");
    }
    res.status(200).json(qa);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//GET by username endpoint
getByUser = async (req, res) =>{
    const user =req.params.value;
    try{
    const qa = await QA.findAll(
    {
        where: {userid: user},
    });
    if(qa.length==0){
    throw new Error("Unable to find a Quiz with userID: " + user);
    }
    res.status(200).json(qa);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//GET by quiz endpoint
getByQuiz = async (req, res) =>{
    const quiz =req.params.value;
    try{
    const qa = await QA.findAll(
    {
        where: {quizid: quiz},
    });
    if(qa.length==0){
    throw new Error("Unable to find a quiz with ID: " + quiz);
    }
    res.status(200).json(qa);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}


//POST endpoint for group creation
create = async (req, res) =>{
    const qa = {
        userid: req.body.userid,
        quizid: req.body.quizid,
        correct_answers_total: req.body.correct_answers_total,
        correct_answers_academic: req.body.correct_answers_academic,
        correct_answers_translated: req.body.correct_answers_translated
    };
    try{
        if(!qa.userid || !qa.quizid || !qa.correct_answers_total || !qa.correct_answers_academic || !qa.correct_answers_translated){
                throw new Error("Essential fields missing");
            }
            await QA.create(qa);
            res.status(201).json(qa);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}



//DELETE endpoint
deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await QA.destroy({where: { id: id }});
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
module.exports = {getAll, getById, getByUser, getByQuiz, create, deleting};