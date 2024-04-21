module.exports = (sequelize, Sequelize, Subjects) => {
    const Chapter = sequelize.define("chapters", {
        chapterid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subjectid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        chapter_number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        chapter_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        number_of_modules: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'chapters'
    });


    Chapter.belongsTo(Subjects, {
        foreignKey: 'subjectid'
    });

    return Chapter;
};
