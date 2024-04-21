module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        userid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dob: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        usertype: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date_joined: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'users'
    });

    return User;
};
