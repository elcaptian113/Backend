module.exports = (sequelize, Sequelize, Users) => {
    const LinkedAccountsParents = sequelize.define("linked_accounts", {
        linkid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parentid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        studentid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'linked_accounts'
    });

    LinkedAccountsParents.belongsTo(Users, {
        foreignKey: 'parentid'
    });


    return LinkedAccountsParents;
};
