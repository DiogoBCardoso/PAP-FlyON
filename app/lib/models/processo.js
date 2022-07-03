const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('processo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cidadedestino: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    checkin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    checkout: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    numadultos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    origem: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    partida: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'processo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "processo_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
