//require refresh table model once built

handleRefresh = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    //add endpoint call to see if token in table response = foundUser
    //if not found res.status(400).send("Refresh Token Invalid") or res.sendStatus(403); //Forbidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
            if (err || foundUser.username !== user.username) return res.sendStatus(403);
            
            const accessToken = generateAccessToken ({userid: user.userid, username: user.username, usertype: user.usertype})

            res.json({accessToken: accessToken})
        }
    );

}

module.exports = { handleRefresh };