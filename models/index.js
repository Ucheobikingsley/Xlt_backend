const dotenv = require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = require("../config/database/connection");

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.categories = require("./categories")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.token = require("./token")(sequelize, Sequelize);
db.country = require("./country")(sequelize, Sequelize);

// db.categories.sync({ alter: true });
// db.country.sync({ alter: true });
// db.user.sync({ force: true });
// db.token.sync({ force: true });

module.exports = db;
