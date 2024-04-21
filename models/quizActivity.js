module.exports = (sequelize, Sequelize, Users, Quizes) => {
    const QuizActivity = sequelize.define("quiz_activity", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quizid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        correct_answers_total: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        correct_answers_academic: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        correct_answers_translated: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'quiz_activity'
    });

    QuizActivity.belongsTo(Users, {
        foreignKey: 'userid'
    });

    QuizActivity.belongsTo(Quizes, {
        foreignKey: 'quizid'
    });

    return QuizActivity;
};
