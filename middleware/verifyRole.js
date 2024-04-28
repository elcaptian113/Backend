const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        console.log(req.user.usertype);
        if (!req?.user) return res.sendStatus(401);
        const authRole= allowedRoles;
        console.log(authRole);
        const role = req.user.usertype;
        if (role !== authRole) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRole;