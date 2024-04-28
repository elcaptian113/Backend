module.exports = (sequelize, Sequelize) => {
    const refreshTokenModel = sequelize.define("refreshtoken", {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'refreshtoken'
    });

    return refreshTokenModel;
};
