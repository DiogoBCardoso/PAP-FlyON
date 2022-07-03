const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proposta', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idprocesso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'processo',
        key: 'id'
      }
    },
    precovoo: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    tempoviagem: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nomehotel: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    precohotel: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    morada: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    disthotel: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    precototal: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    datalimitereservavoo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'proposta',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "proposta_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
