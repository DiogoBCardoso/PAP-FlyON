'use strict'


const api = require('../repo/amadeusApi')
const db = require('../repo/flyon-db')
const express = require('express')
const infovoo = require('../models/infovoo')
const Router = express.Router


const router = Router()
router.use(express.urlencoded({extended: false}))
module.exports = router

router.get('/', (req, resp, next)=>{resp.render('menu')})

//---------------------Processos------------------------
router.get('/processo', HandlerGetAllProcessos)
router.get('/processo/create', (req, resp, next) => {resp.render('createprocesso', )})
router.get('/processo/:id', HandlerGetOneProcesso)
router.post('/processo', HandlerCreateProcesso)
router.get('/processo/:id/delete', HandlerDeleteProcesso)


function HandlerGetAllProcessos(req, resp, next){
    db
            .getAllGeneric("processo")
            .then( procs => resp.render('allprocessos',{data: procs}))
            .catch(next)
}

function HandlerGetOneProcesso(req, resp, next){
    const id = req.params.id
    db
            .getOneGeneric("processo", id)
            .then( procs => resp.render('oneprocesso',{data: procs}))
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
    const escalas = req.body.escalas
    db
        .createProcesso(cidadedestino, checkin, checkout, numadultos, radius, origem, partida, escalas)
        .then((id) => resp.redirect('/flyon/processo/'+id))
        .catch(next)
}

function HandlerDeleteProcesso(req, resp, next){
    const id = req.params.id
    db
        .deleteGeneric("processo", id)
        .then(() => resp.redirect('/flyon/processo'))
        .catch(next)
}

//--------------------InfoVoo--------------------------
router.get('/infovoo', HandlerGetAllInfoVoos)
router.get('/infovoo/:ivid', HandlerGetOneInfoVoo)
router.post('/infovoo', HandlerCreateInfoVoo)
router.get('/infovoo/:ivid/delete', HandlerDeleteInfoVoo)
router.get('/proposta/:pid/infovoo', HandlerGetInfoVooByProposta)       
router.get('/proposta/:pid/infovoo/:ivid', HandlerGetOneInfoVooByProposta) 
router.get('/proposta/:pid/infovoo/:ivid/delete', HandlerDeleteInfoVoo) 
router.get('/processo/:id/proposta/:pid/infovoo', HandlerGetInfoVooByPropostaByProcesso)  
router.get('/processo/:id/proposta/:pid/infovoo/:ivid', HandlerGetOneInfoVooByPropostaByProcesso)
router.get('/processo/:id/proposta/:pid/infovoo/:ivid/delete', HandlerDeleteInfoVoo)

function HandlerGetAllInfoVoos(req, resp, next){
    db
            .getAllGeneric("infovoo")
            .then( infovoos => resp.render('allinfovoo',{data: infovoos}))
            .catch(next)
}

function HandlerGetOneInfoVoo(req, resp, next){
    const ivid = req.params.ivid
    db
            .getOneGeneric("infovoo", ivid)
            .then( infovoo => resp.render('oneinfovoo',{data: infovoo}))
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
        .then((id) => resp.redirect('/flyon/infovoo/'+id))
        .catch(next)
}

function HandlerDeleteInfoVoo(req, resp, next){
    const ivid = req.params.ivid
    db
        .deleteGeneric("infovoo", ivid)
        .then(() => resp.redirect('/flyon/infovoo'))
        .catch(next)
}

function HandlerGetOneInfoVooByProposta(req, resp, next) {
    const pid = req.params.pid
    const ivid = req.params.ivid
    db
        .getOneInfoVooByProposta(pid, ivid)
        .then( proc => resp.render('oneinfovoobyproposta',{data: proc}))
        .catch(next)
}

function HandlerGetInfoVooByProposta(req, resp, next) {
    const pid = req.params.pid
    db
        .getInfoVooByProposta(pid)
        .then( infos => resp.render('allinfovoobyproposta',{data: infos}))
        .catch(next)
}

function HandlerGetOneInfoVooByPropostaByProcesso(req, resp, next) {
    const id = req.params.id
    const pid = req.params.pid
    const ivid = req.params.ivid
    db
        .getOneInfoVooByProposta(pid, ivid)
        .then( proc => resp.render('oneinfovoobypropostabyprocesso',{data: proc, procid: id}))
        .catch(next)
}

function HandlerGetInfoVooByPropostaByProcesso(req, resp, next) {
    const id = req.params.id
    const pid = req.params.pid
    db
        .getInfoVooByProposta(pid)
        .then( infos => resp.render('allinfovoobypropostabyprocesso',{data: infos, procid: id}))
        .catch(next)
}

//--------------------Proposta--------------------------
router.get('/proposta', HandlerGetAllPropostas)
router.get('/proposta/:pid', HandlerGetOneProposta)
router.post('/proposta', HandlerCreateProposta)
router.get('/proposta/:pid/delete', HandlerDeleteProposta)
router.get('/processo/:id/proposta', HandlerGetPropostasByProcesso) 
router.get('/processo/:id/proposta/:pid', HandlerGetOnePropostaByProcesso)
router.get('/processo/:id/proposta/:pid/delete', HandlerDeleteProposta)

function HandlerGetAllPropostas(req, resp, next){
    db
            .getAllGeneric("proposta")
            .then( propostas => resp.render('allpropostas',{data: propostas}))
            .catch(next)
}

function HandlerGetOneProposta(req, resp, next){
    const pid = req.params.pid
    db
            .getOneGeneric("proposta", pid)
            .then( props => resp.render('oneproposta',{data: props}))
            .catch(next)
}   

function HandlerCreateProposta(req, resp, next){
    const idprocesso = req.body.idprocesso
    const precovoo = req.body.precovoo
    const tempoviagem = req.body.tempoviagem
    const numescalas = req.body.numescalas
    const nomehotel = req.body.nomehotel
    const precohotel = req.body.precohotel
    const morada = req.body.morada
    const disthotel = req.body.disthotel
    const precototal = req.body.precototal
    const datalimitereservavoo = req.body.datalimitereservavoo
    db
        .createProposta(idprocesso, precovoo, tempoviagem, numescalas, nomehotel, precohotel, morada, disthotel, precototal, datalimitereservavoo)
        .then((id) => resp.redirect('/flyon/proposta/'+id))
        .catch(next)
}

function HandlerDeleteProposta(req, resp, next){
    const pid = req.params.pid
    db
        .deleteGeneric("proposta", pid)
        .then(() => resp.redirect('/flyon/proposta'))
        .catch(next)
}

function HandlerGetPropostasByProcesso(req, resp, next) {
    const id = req.params.id
    db
        .getPropostasByProcesso(id)
        .then( prop => resp.render('allpropostasbyprocesso',{data : prop}))
        .catch(next)
}

function HandlerGetOnePropostaByProcesso(req, resp, next) {
    const id = req.params.id
    const pid = req.params.pid
    db
        .getOnePropostaByProcesso(id, pid)
        .then( prop => resp.render('onepropostabyprocesso',{data: prop}))
        .catch(next)
}

//--------------------Utilizadores--------------------------
router.get('/utilizadores', HandlerGetAllUtilizadores)
router.get('/utilizadores/:uid', HandlerGetOneUtilizador)
router.post('/utilizadores', HandlerCreateUtilizador)
router.get('/utilizadores/:uid/delete', HandlerDeleteUtilizador)

function HandlerGetAllUtilizadores(req, resp, next){
    db
            .getAllGeneric("utilizadores")
            .then( utilizador => resp.render('allutilizadores',{data: utilizador}))
            .catch(next)
}

function HandlerGetOneUtilizador(req, resp, next){
    const uid = req.params.uid
    db
            .getOneGeneric("utilizadores", uid)
            .then( utilizador => resp.render('oneutilizador',{data: utilizador}))
            .catch(next)
}   

function HandlerCreateUtilizador(req, resp, next){
    const nome = req.body.nome
    db
        .createUtilizadores(nome)
        .then((id) => resp.redirect('/flyon/utilizadores/'+id))
        .catch(next)
}

function HandlerDeleteUtilizador(req, resp, next){
    const uid = req.params.uid
    db
        .deleteGeneric("utilizadores", uid)
        .then(() => resp.redirect('/flyon/utilizadores'))
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
                    if(hoteis.length == 0) throw Error('There are no hotels with that criteria available')
                    resp.render('getoffers',{data: {"voos": voos , "hoteis": hoteis, "id":proc[0].id}})
                })
                .catch(next)
        })
        .catch(next)
   
}
router.post('/processo/:id/createOffer', HandlerCreateOffer)
//Criar Proposta e as suas InfoVoos
function HandlerCreateOffer(req, resp, next) {
    const idproc = req.params.id
    const hotel = req.body.hotel.split(',')
    const voo = req.body.voo.split(',')
    const precovoo = voo[7]
    const tempoviagem = voo[0]
    const nomehotel = hotel[0]
    const precohotel = hotel[4]
    const morada = hotel[1]+", "+hotel[2]
    const disthotel = hotel[3]
    const precototal = parseFloat(voo[7])+parseFloat(hotel[4])
    const datalimitereservavoo = voo[6]
    var companhia = voo[5];
    var origem = voo[1];
    var destino = voo[3];
    var partida = voo[2];
    var chegada = voo[4];

    
return db
        .createProposta(idproc, precovoo, tempoviagem, nomehotel, precohotel, morada, disthotel, precototal, datalimitereservavoo)
        .then( id => {
            var auxpartida = partida.split("T")
            var auxchegada = chegada.split("T")
            db
                .createInfoVoo(id, companhia, origem, destino, auxpartida[0], auxpartida[1], auxchegada[0], auxchegada[1])
                .then(() => resp.redirect("/flyon/processo/"+idproc+"/proposta/"+id))
                .catch(next)
        })
        .catch(next)
   
}