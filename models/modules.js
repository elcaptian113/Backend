module.exports = (sequelize, Sequelize, Chapters, Subjects) => {
    const Module = sequelize.define("modules", {
        moduleid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subjectid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        chapterid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        module_number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        module_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'modules'
    });

    Module.belongsTo(Chapters, {
        foreignKey: 'chapterid'
    });

    Module.belongsTo(Subjects, {
        foreignKey: 'subjectid'
    });

    return Module;
};
