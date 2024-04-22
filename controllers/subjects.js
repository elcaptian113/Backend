//import file dependencies for endpoints
const utilities = require('../utilities/utility');
const db = require('../models');


const Subjects = db.subjects;

//GET all endpoint
getAll = async (req, res) =>{
 const subjects = await Subjects.findAll({order: ['subjectid']});
 res.status(200).json(subjects);
}

getById = async (req, res) =>{
    const id =req.params.id;
    try{
    const subject = await Subjects.findByPk(id);
    if(subject==null || subject.length==0){
    throw new Error("Unable to find subject");
    }
    res.status(200).json(subject);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
}

//POST endpoint for subject creation
create = async (req, res) =>{
    const subject = {
        level: req.body.level,
        name: req.body.name,
        number_of_chapters: req.body.number_of_chapters
    };
    try{
        if(!subject.level || !subject.name || !subject.number_of_chapters){
                throw new Error("Essential fields missing");
            }
            await Subjects.create(subject);
            res.status(201).json(subject);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}



//PUT endpoint for updating existing subject records
update = async (req, res) => {
    const id = req.body.id;
    const subject = {
        level: req.body.level,
        name: req.body.name,
        number_of_chapters: req.body.number_of_chapters
    };
    try {
        if (!subject.level || !subject.name || !subject.number_of_chapters) {
            throw new Error("Essential fields missing");
        }
        await Subjects.update(subject, { where: { subjectid: id } });
        res.status(200).json(subject);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

//DELETE endpoint
deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await Subjects.destroy({where: { subjectid: id }});
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
module.exports = {getAll, getById, create, update, deleting};