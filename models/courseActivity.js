module.exports = (sequelize, Sequelize, Users, Modules) => {
    const CourseActivity = sequelize.define("course_activity", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        moduleid: {
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
        tableName: 'course_activity'
    });

    CourseActivity.belongsTo(Users, {
        foreignKey: 'userid'
    });

    CourseActivity.belongsTo(Modules, {
        foreignKey: 'moduleid'
    });

    return CourseActivity;
};
