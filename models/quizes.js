module.exports = (sequelize, Sequelize, Modules) => {
    const Quiz = sequelize.define("quizes", {
        quizid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        moduleid: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'quizes'
    });

    Quiz.belongsTo(Modules, {
        foreignKey: 'moduleid'
    });

    return Quiz;
};
