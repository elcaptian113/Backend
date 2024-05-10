//import file dependencies for endpoints
const utilities = require('../utilities/utility');
const db = require('../models');


const Content = db.content;


//GET by module ID endpoint
getByModule = async (req, res) =>{
    const module =req.params.value;
    try{
    const content = await Content.findAll(
    {
        where: {moduleid: module},
    });
    if(content.length==0){
    throw new Error("Unable to find content belonging to: " + module);
    }
    res.status(200).json(content);
    }
    catch(error){
    utilities.formatErrorResponse(res,400,error.message);
    }
 }


//POST endpoint for content creation
create = async (req, res) =>{
    const content = {
        moduleid: req.body.moduleid,
        heading: req.body.heading,
        academic: req.body.academic,
        translated: req.body.translated,
    };
    try{
        if(!content.moduleid || !content.academic || !content.translated ){
                throw new Error("Essential fields missing");
            }
            await Content.create(content);
            res.status(201).json(content);
    }
    catch (error){
        utilities.formatErrorResponse(res,400,error.message);
    }
}



//PUT endpoint for updating existing content
update = async (req, res) => {
    const id = req.body.id;
    const content = {
        moduleid: req.body.moduleid,
        heading: req.body.heading,
        academic: req.body.academic,
        translated: req.body.translated,
    };
    try{
        if(!content.moduleid || !content.academic || !content.translated ){
            throw new Error("Essential fields missing");
        }
        await Content.update(content, { where: { id: id } });
        res.status(200).json(content);
    } catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

//DELETE endpoint
deleting = async (req, res) =>{
    const id =req.body.id;
    try{
        const deleted = await Content.destroy({where: { id: id }});
        if (deleted==0) {
            throw new Error("Id not found");
         }
         res.status(200).send("Content has been deleted");
    }
   catch(error){
        utilities.formatErrorResponse(res,404,error.message);
   }
}

//export all functions to enable access by other files
module.exports = {getByModule, create, update, deleting};