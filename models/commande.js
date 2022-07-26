module.exports = (sequelize, DataTypes) => {
  const Commande = sequelize.define("commande", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    status: {
      type: DataTypes.ENUM("Fournisseur", "En cours", "Reçue"),
      defaultValue: "Fournisseur",
    },
    quantite_commande: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    num_commande: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    date_commande: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    depart_fournisseur: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_livraison: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    archive: {
      type:  DataTypes.BOOLEAN ,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Commande;
};
