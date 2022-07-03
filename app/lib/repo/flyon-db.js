'use strict'

//-----------Local--------------
/*const user = 'postgres'
const host = 'localhost'
const database = 'flyon'
const password = 'diogo123'
const port = '5432'*/
//-------------Heroku-----------
const user = 'yojbmfgfkkchng'
const host = 'ec2-44-206-11-200.compute-1.amazonaws.com'
const database = 'ddte6nouihhkba'
const password = 'ba8b7ca4d475dcf5d2b83ad925cd7b8ff93cd7272aca66b909c37f41f7dc0b8b'
const port = '5432'

const pkg = require('sequelize')
const { Sequelize, Model, DataTypes } = pkg;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  logging: false
})

const { Op } = require("sequelize");

function connection() {
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
  }
 
  //--------------------------Usar com cuidado-------------------------------
  function connectionClose() {
   sequelize.close()
  }
 
 const initModels = require('../models/init-models')
 
 const models =  initModels(sequelize)

 //-------------Generics------Funções que dão para todas as tabelas----------
 function getAllGeneric(table){
  return models[table].
    findAll().    
    then(row=>  {

      return row
    })
     .catch(err => {
       throw new Error('Error: ' + err)
   })   
}

function getOneGeneric(table, id){
  return models[table].
    findAll(
      {
        where: {
          id: id
        }
      }
    )    
    .then(row=>  {
      return row
    })
     .catch(err => {
       throw new Error('Error: ' + err)
   })   
}

function deleteGeneric(table, id){
  return sequelize.
    models[table].
        destroy(
          {
            where: {
              id: id
            }
          }
        ).then(numberRows => {
          return numberRows
        })
        .catch(function (err) {
          console.log(err.name)
          console.log(err.message)
    });
}

function updateGeneric(table, id, param, newVal){
  return sequelize.
    models[table].
        update(
          {[param]: newVal},
          {where: {id: id}}
        ).then(numberRows => {
          return numberRows
        })
        .catch(function (err) {
          console.log(err.name)
          console.log(err.message)
    });
}

//--------------------------------Creates--------------------------------
function createInfoVoo(idproposta, companhia, origem, destino, partidadata, partidatempo, chegadadata, chegadatempo){
  return sequelize.
    models.
    infovoo.
        create({
          idproposta: idproposta,
          companhia: companhia,
          origem: origem,
          destino: destino,
          partidadata: partidadata,
          partidatempo: partidatempo,
          chegadadata: chegadadata,
          chegadatempo: chegadatempo
        })
        .then(result => {
          console.log("InfoVoo sucessfuly created with " + result.id )
          return result.id
        })
        .catch(function (err) {
          throw new Error('Error: ' + err)
    });
}

function createProcesso(cidadedestino, checkin, checkout, numadultos, radius, origem, partida){
  var checkIn  = (checkin == "null") ? null : checkin
  var checkOut  = (checkout == "null") ? null : checkout
  var Radius  = (radius == "null") ? null : radius
 return sequelize.
    models.
      processo.
        create({
          cidadedestino: cidadedestino,
          checkin: checkIn,
          checkout: checkOut,
          numadultos: numadultos,
          radius: Radius,
          origem: origem,
          partida: partida
        })
        .then(result => {
          console.log("Processo sucessfuly created with " + result.id )
          return result.id
        })
        .catch(function (err) {
          throw new Error('Error: ' + err)
    });
}

function createUtilizadores(nome) {
  return sequelize.
    models.
      utilizadores.
        create({
          nome: nome
        })
        .then(result => {
          console.log("Utilizador sucessfuly created with " + result.id )
          return result.id 
        })
        .catch(function (err) {
          throw new Error('Error: ' + err)
    });
}

function createProposta(idprocesso, precovoo, tempoviagem, nomehotel, precohotel, morada, disthotel, precototal, datalimitereservavoo) {
  return sequelize.
    models.
      proposta.
        create({
          idprocesso: idprocesso,
          precovoo: precovoo,
          tempoviagem: tempoviagem,
          nomehotel: nomehotel,
          precohotel: precohotel,
          morada: morada,
          disthotel: disthotel,
          precototal: precototal,
          datalimitereservavoo: datalimitereservavoo,
          estado: "Pendente Aprovação"
        })
        .then(result => {
          console.log("Proposta sucessfuly created with " + result.id )
          return result.id
        })
        .catch(function (err) {
          throw new Error('Error: ' + err)
    });
}

//-----------------deloras---------------------
function getPropostasByProcesso(idproc) {
  return sequelize.
            models.
              proposta.
                findAll({
                  where: {
                    idprocesso: idproc
                  }
                }
                ).    
            then(props=>  {
              return JSON.parse(JSON.stringify(props, null, 4))
            })
            .catch(err => {
              throw new Error('Error: ' + err)
          })   
}

function getOnePropostaByProcesso(idproc, idprop) {
  return sequelize.
            models.
              proposta.
                findAll({
                  where: {
                    id: idprop,
                    idprocesso: idproc
                  }
                }
                ).    
            then(props=>  {
              return JSON.parse(JSON.stringify(props, null, 4))
            })
            .catch(err => {
              throw new Error('Error: ' + err)
          })   
}

function getInfoVooByProposta(idprop) {
  return sequelize.
            models.
              infovoo.
                findAll({
                  where: {
                    idproposta: idprop
                  }
                }
                )    
            .then(infos=>  {
              return JSON.parse(JSON.stringify(infos, null, 4))
            })
            .catch(err => {
              throw new Error('Error: ' + err)
          })   
}

function getOneInfoVooByProposta(idprop, idinfo){
  return sequelize.
            models.
              infovoo.
                findAll({
                  where: {
                    id: idinfo,
                    idproposta: idprop
                  }
                }
                ).
            then(infos=>  {
              return JSON.parse(JSON.stringify(infos, null, 4))
            })
            .catch(err => {
              throw new Error('Error: ' + err)
          })
}

module.exports = {
    'getAllGeneric' : getAllGeneric,
    'getOneGeneric' : getOneGeneric,
    'deleteGeneric' : deleteGeneric,
    'updateGeneric' : updateGeneric,
    'createInfoVoo' : createInfoVoo,
    'createProcesso' : createProcesso,
    'createUtilizadores' : createUtilizadores,
    'createProposta' : createProposta,
    'getPropostasByProcesso' : getPropostasByProcesso,
    'getOnePropostaByProcesso' : getOnePropostaByProcesso,
    'getInfoVooByProposta' : getInfoVooByProposta,
    'getOneInfoVooByProposta' : getOneInfoVooByProposta
}
