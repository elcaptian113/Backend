module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("subjects", {
        subjectid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        level: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        number_of_chapters: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'subjects'
    });

    return Subject;
};
