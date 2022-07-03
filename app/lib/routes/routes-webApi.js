'use strict'


const api = require('../repo/amadeusApi')
const db = require('../repo/flyon-db')
const express = require('express')
const infovoo = require('../models/infovoo')
const Router = express.Router


const router = Router()
router.use(express.urlencoded({extended: false}))
module.exports = router

router.get('/', (req, resp, next)=>{resp.send("Welcome to FlyON App!!")})

//---------------------Processos------------------------
router.get('/processo', HandlerGetAllProcessos)
router.get('/processo/:id', HandlerGetOneProcesso)
router.put('/processo', HandlerCreateProcesso)
router.delete('/processo/:id', HandlerDeleteProcesso)

function HandlerGetAllProcessos(req, resp, next){
    db
            .getAllGeneric("processo")
            .then( procs => resp.send({data: procs}))
            .catch(next)
}

function HandlerGetOneProcesso(req, resp, next){
    const id = req.params.id
    db
            .getOneGeneric("processo", id)
            .then( procs => resp.send({data: procs}))
            .catch(next)
}

function HandlerCreateProcesso(req, resp, next){
    const cidadedestino = req.body.cidadedestino
    const checkin = req.body.checkin
    const checkout = req.body.checkout
    const numadultos = req.body.numadultos
    const radius = req.body.radius
    const origem = req.body.origem
    const partida = req.body.partida
    db
        .createProcesso(cidadedestino, checkin, checkout, numadultos, radius, origem, partida)
        .then((id) => resp.json('Processo created with id:'+id))
        .catch(next)
}

function HandlerDeleteProcesso(req, resp, next){
    const id = req.params.id
    db
        .deleteGeneric("processo", id)
        .then(() => resp.json('Processo '+id+' removed'))
        .catch(next)
}

//--------------------InfoVoo--------------------------
router.get('/infovoo', HandlerGetAllInfoVoos)
router.get('/infovoo/:ivid', HandlerGetOneInfoVoo)
router.put('/infovoo', HandlerCreateInfoVoo)
router.delete('/infovoo/:ivid', HandlerDeleteInfoVoo)
router.get('/proposta/:pid/infovoo', HandlerGetInfoVooByProposta)       
router.get('/proposta/:pid/infovoo/:ivid', HandlerGetOneInfoVooByProposta) 
router.get('/processo/:id/proposta/:pid/infovoo', HandlerGetInfoVooByProposta)  
router.get('/processo/:id/proposta/:pid/infovoo/:ivid', HandlerGetOneInfoVooByProposta)

function HandlerGetAllInfoVoos(req, resp, next){
    db
            .getAllGeneric("infovoo")
            .then( infovoos => resp.send({data: infovoos}))
            .catch(next)
}

function HandlerGetOneInfoVoo(req, resp, next){
    const ivid = req.params.ivid
    db
            .getOneGeneric("infovoo", ivid)
            .then( infovoo => resp.send({data: infovoo}))
            .catch(next)
}

function HandlerCreateInfoVoo(req, resp, next){
    const idproposta = req.body.idproposta
    const companhia = req.body.companhia
    const origem = req.body.origem
    const destino = req.body.destino
    const partidata = req.body.partidata
    const partidatempo = req.body.partidatempo
    const chegadadata = req.body.chegadadata
    const chegadatempo = req.body.chegadatempo
    db
        .createInfoVoo(idproposta, companhia, origem, destino, partidata, partidatempo, chegadadata, chegadatempo)
        .then((id) => resp.json('InfoVoo created with id:'+id))
        .catch(next)
}

function HandlerDeleteInfoVoo(req, resp, next){
    const ivid = req.params.ivid
    db
        .deleteGeneric("infovoo", ivid)
        .then(() => resp.json('InfoVoo '+id+' removed'))
        .catch(next)
}

function HandlerGetOneInfoVooByProposta(req, resp, next) {
    const pid = req.params.pid
    const ivid = req.params.ivid
    db
        .getOneInfoVooByProposta(pid, ivid)
        .then( proc => resp.send({data: proc}))
        .catch(next)
}

function HandlerGetInfoVooByProposta(req, resp, next) {
    const pid = req.params.pid
    db
        .getInfoVooByProposta(pid)
        .then( infos => resp.send({data: infos}))
        .catch(next)
}

//--------------------Proposta--------------------------
router.get('/proposta', HandlerGetAllPropostas)
router.get('/proposta/:pid', HandlerGetOneProposta)
router.put('/proposta', HandlerCreateProposta)
router.delete('/proposta/:pid', HandlerDeleteProposta)
router.get('/processo/:id/proposta', HandlerGetPropostasByProcesso) 
router.get('/processo/:id/proposta/:pid', HandlerGetOnePropostaByProcesso)

function HandlerGetAllPropostas(req, resp, next){
    db
            .getAllGeneric("proposta")
            .then( propostas => resp.send({data: propostas}))
            .catch(next)
}

function HandlerGetOneProposta(req, resp, next){
    const pid = req.params.pid
    db
            .getOneGeneric("proposta", pid)
            .then( props => resp.send({data: props}))
            .catch(next)
}   

function HandlerCreateProposta(req, resp, next){
    const idprocesso = req.body.idprocesso
    const precovoo = req.body.precovoo
    const tempoviagem = req.body.tempoviagem
    const nomehotel = req.body.nomehotel
    const precohotel = req.body.precohotel
    const morada = req.body.morada
    const disthotel = req.body.disthotel
    const precototal = req.body.precototal
    const datalimitereservavoo = req.body.datalimitereservavoo
    db
        .createProposta(idprocesso, precovoo, tempoviagem, nomehotel, precohotel, morada, disthotel, precototal, datalimitereservavoo)
        .then((id) => resp.json('Proposta created with id:'+id))
        .catch(next)
}

function HandlerDeleteProposta(req, resp, next){
    const pid = req.params.pid
    db
        .deleteGeneric("proposta", pid)
        .then(() => resp.json('Proposta '+id+' removed'))
        .catch(next)
}

function HandlerGetPropostasByProcesso(req, resp, next) {
    const id = req.params.id
    db
        .getPropostasByProcesso(id)
        .then( prop => resp.send({data : prop}))
        .catch(next)
}

function HandlerGetOnePropostaByProcesso(req, resp, next) {
    const id = req.params.id
    const pid = req.params.pid
    db
        .getOnePropostaByProcesso(id, pid)
        .then( prop => resp.send({data: prop}))
        .catch(next)
}

//--------------------Utilizadores--------------------------
router.get('/utilizadores', HandlerGetAllUtilizadores)
router.get('/utilizadores/:uid', HandlerGetOneUtilizador)
router.put('/utilizadores', HandlerCreateUtilizador)
router.delete('/utilizadores/:uid', HandlerDeleteUtilizador)

function HandlerGetAllUtilizadores(req, resp, next){
    db
            .getAllGeneric("utilizadores")
            .then( utilizador => resp.send({data: utilizador}))
            .catch(next)
}

function HandlerGetOneUtilizador(req, resp, next){
    const uid = req.params.uid
    db
            .getOneGeneric("utilizadores", uid)
            .then( utilizador => resp.send({data: utilizador}))
            .catch(next)
}   

function HandlerCreateUtilizador(req, resp, next){
    const nome = req.body.nome
    db
        .createUtilizadores(nome)
        .then((id) => resp.json('Utilizador created with id:'+id))
        .catch(next)
}

function HandlerDeleteUtilizador(req, resp, next){
    const uid = req.params.uid
    db
        .deleteGeneric("utilizadores", uid)
        .then(() => resp.json('Utilizador '+id+' removed'))
        .catch(next)
}

//--------------------Api AMADEUS ---------------------------
router.get('/processo/:id/getOffers', HandlerGetOffers)     
//atenção que se não tiver 5 opçoes devolve null nas que faltar (e.g. [of1, of2, of3, of4, null] se so tiver 4 ofertas disponiveis)
function HandlerGetOffers(req, resp, next) {
    const id = req.params.id
return db
        .getOneGeneric("processo", id)
        .then( proc => {
            const task1 = api.getFlights(proc[0])
            const task2 = api.getHotels(proc[0])
            return Promise
                .all([task1, task2])
                .then(([voos, hoteis]) => {
                    if(voos.length == 0) throw Error('There are no flights with that criteria available')
                    if(hoteis.lenght == 0) throw Error('There are no hotels with that criteria available')
                    resp.send({data: {"voos": voos , "hoteis": hoteis}})
                })
                .catch(next)
        })
        .catch(next)
   
}