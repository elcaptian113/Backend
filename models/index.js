const config = require("../config/config");
const Chapters = require("./chapters");
const CourseActivity = require("./courseActivity");
const LinkedAccounts = require("./linkedAccounts");
const Modules = require("./modules");
const Quizes = require("./quizes");
const QuizActivity = require("./quizActivity");
const Subjects = require("./subjects");
const Users = require("./users");
const RefreshToken = require("./refresh");
const Content = require("./content");

// Set up ORM credentials
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.PORT
  }
);

// Set up ORM process for connections
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

// Initialize ORM and object models
db.Sequelize = Sequelize;

db.users = Users(sequelize, Sequelize);

db.linked_accounts = LinkedAccounts(sequelize, Sequelize, db.users);

db.refreshtoken = RefreshToken(sequelize, Sequelize);

db.subjects = Subjects(sequelize, Sequelize);
db.chapters = Chapters(sequelize, Sequelize, db.subjects);
db.modules = Modules(sequelize, Sequelize, db.chapters, db.subjects);
db.content = Content(sequelize, Sequelize, db.modules);
db.quizes = Quizes(sequelize, Sequelize, db.modules);

db.course_activity = CourseActivity(sequelize, Sequelize, db.users, db.modules);
db.quiz_activity = QuizActivity(sequelize, Sequelize, db.users, db.quizes);

module.exports = db;
