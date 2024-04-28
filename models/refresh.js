module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refreshtoken", {
        username: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'refreshtoken'
    });

    return RefreshToken;
};
