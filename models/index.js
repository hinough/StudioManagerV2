const config = require('../config.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password, {
        host: config.database.host,
        dialect: config.database.dialect,
        operatorsAliases: false,

        pool: {
            max: config.database.pool.max,
            min: config.database.pool.min,
            acquire: config.database.pool.acquire,
            idle: config.database.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["User", "Administrator"];

module.exports = db;