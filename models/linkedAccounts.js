module.exports = (sequelize, Sequelize, Users) => {
    const LinkedAccounts = sequelize.define("linked_accounts", {
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

    LinkedAccounts.belongsTo(Users, {
        foreignKey: 'parent'
    });

    LinkedAccounts.belongsTo(Users, {
        foreignKey: 'student'
    });

    return LinkedAccounts;
};
