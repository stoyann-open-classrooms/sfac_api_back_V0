module.exports = (sequelize, DataTypes) => {
    const Demande = sequelize.define("demande", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  
      status: {
        type: DataTypes.ENUM("A traiter", "Archivé"),
        defaultValue: "A traiter",
      },
  
      date_archive: {
        type: DataTypes.DATE,
        allowNull: true,
      },
     
    });
  
    return Demande;
  };
  