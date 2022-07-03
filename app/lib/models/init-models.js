var DataTypes = require("sequelize").DataTypes;
var _infovoo = require("./infovoo");
var _processo = require("./processo");
var _proposta = require("./proposta");
var _utilizadores = require("./utilizadores");

function initModels(sequelize) {
  var infovoo = _infovoo(sequelize, DataTypes);
  var processo = _processo(sequelize, DataTypes);
  var proposta = _proposta(sequelize, DataTypes);
  var utilizadores = _utilizadores(sequelize, DataTypes);

  proposta.belongsTo(processo, { as: "idprocesso_processo", foreignKey: "idprocesso"});
  processo.hasMany(proposta, { as: "proposta", foreignKey: "idprocesso"});
  infovoo.belongsTo(proposta, { as: "idproposta_propostum", foreignKey: "idproposta"});
  proposta.hasMany(infovoo, { as: "infovoos", foreignKey: "idproposta"});

  return {
    infovoo,
    processo,
    proposta,
    utilizadores,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
