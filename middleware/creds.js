const allowedURL = require('../config/allowedURL');

const creds = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedURL.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = creds