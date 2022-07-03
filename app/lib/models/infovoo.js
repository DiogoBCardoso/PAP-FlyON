const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('infovoo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idproposta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proposta',
        key: 'id'
      }
    },
    companhia: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    origem: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    destino: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    partidadata: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    partidatempo: {
      type: DataTypes.TIME,
      allowNull: true
    },
    chegadadata: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    chegadatempo: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'infovoo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "infovoo_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
