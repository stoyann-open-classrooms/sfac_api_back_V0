const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
///====================== synchronisation des models

db.demandes = require("./demande")(sequelize, DataTypes);
db.commandes = require("./commande")(sequelize, DataTypes);

db.kanbans = require("./kanban")(sequelize, DataTypes);
db.produits = require("./produit")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("base de donnée synchroniser!");
});

// ================= RELATIONS OK =============

// 1 to many relation between produits et kanbans

db.produits.hasOne(db.kanbans);
db.kanbans.belongsTo(db.produits);

// 1 to many relation between kanbans et demandes

db.kanbans.hasMany(db.demandes);
db.demandes.belongsTo(db.kanbans);

// db.kanbans.hasMany(db.commandes);
// db.commandes.belongsTo(db.kanbans);
db.produits.hasMany(db.commandes);
db.commandes.belongsTo(db.produits);

module.exports = db;
