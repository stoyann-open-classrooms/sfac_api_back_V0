module.exports = (sequelize, DataTypes) => {
  const Kanban = sequelize.define("kanban", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    produitId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    uid_nfc: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Kanban;
};
