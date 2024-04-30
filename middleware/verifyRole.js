const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req?.usertype) return res.sendStatus(401);
        const authRole= allowedRoles;
        const role = req.usertype;
        if (role !== authRole) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRole;