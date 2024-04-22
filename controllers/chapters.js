//import file dependencies for endpoints
const utilities = require('../utilities/utility');
const db = require('../models');


const Chapters = db.chapters;

//GET all chapters endpoint
getAll = async (req, res) =>{
 const chapters = await Chapters.findAll({order: ['chapterid']});
 res.status(200).json(chapters);
}

//GET by ID endpoint
getById = async (req, res) =>{
    const id =req.params.id;
    try{
    const chapter = await Chapters.findByPk(id);
    if(chapter==null || chapter.length==0){
    throw new Error("Unable to find Chapter");
    }
    res.status(200).json(chapter);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//GET by Subject ID endpoint
getBySubject = async (req, res) =>{
    const subject =req.params.value;
    try{
    const chapters = await Chapters.findAll(
    {where: {subjectid: subject},
    });
    if(chapters.length==0){
    throw new Error("Unable to find a Chapters belonging to: " + subject);
    }
    res.status(200).json(chapters);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
 }

//POST endpoint for subject creation
create = async (req, res) =>{
    const chapter = {
        subjectid: req.body.subjectid,
        chapter_number: req.body.chapter_number,
        chapter_name: req.body.chapter_name,
        number_of_modules: req.body.number_of_modules
    };
    try{
        if(!chapter.subjectid || !chapter.number || !chapter.chapter_name || !chapter.number_of_modules){
                throw new Error("Essential fields missing");
            }
            await Chapters.create(chapter);
            res.status(201).json(chapter);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}



//PUT endpoint for updating existing subject records
update = async (req, res) => {
    const id = req.body.id;
    const chapter = {
        subjectid: req.body.subjectid,
        chapter_number: req.body.chapter_number,
        chapter_name: req.body.chapter_name,
        number_of_modules: req.body.number_of_modules
    };
    try {
        if (!chapter.subjectid || !chapter.number || !chapter.chapter_name || !chapter.number_of_modules) {
            throw new Error("Essential fields missing");
        }
        await Chapters.update(chapter, { where: { chapterid: id } });
        res.status(200).json(chapter);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

//DELETE endpoint
deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await Chapters.destroy({where: { chapterid: id }});
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
module.exports = {getAll, getById, getBySubject, create, update, deleting};