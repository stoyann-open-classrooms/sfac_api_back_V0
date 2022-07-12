module.exports = (sequelize, DataTypes) => {
  const Demande = sequelize.define("demande", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    status: {
      type: DataTypes.ENUM("A traiter", "En cours", "Reçue"),
      defaultValue: "A traiter",
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
  });

  return Demande;
};
