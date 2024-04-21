//set error handing function and response behaviour
function formatErrorResponse(res, code, message) {
    const err = {
    error: {
    status: code,
    message: message,
    },
    };
    return res.status(code).send(err);
    }
   
    module.exports = {formatErrorResponse};