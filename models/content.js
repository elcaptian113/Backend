module.exports = (sequelize, Sequelize, Modules) => {
    const Content = sequelize.define("content", {
        moduleid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        heading: {
            type: Sequelize.STRING,
            allowNull: false
        },
        academic: {
            type: Sequelize.STRING,
            allowNull: false
        },
        translated: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stranger_things: {
            type: Sequelize.STRING,
            allowNull: false
        },
        riverdale: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'content'
    });

    Content.belongsTo(Modules, {
        foreignKey: 'moduleid'
    });


    return Content;
};
