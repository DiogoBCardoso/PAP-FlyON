'use strict'

var Amadeus = require('amadeus');
const db = require('./flyon-db')


var amadeus = new Amadeus({
  clientId: 'AJeMMeA5QI9AQX2mKMOiOaV0VML5GFTI',
  clientSecret: 'KNzzeeN1wqUJoeTc'
});

//-----------Procurar por Hoteis-------------

function getFlights(processo){
  return amadeus.shopping.flightOffersSearch.get({
    originLocationCode: processo.origem,
    destinationLocationCode: processo.cidadedestino,
    departureDate: processo.partida,
    adults: processo.numadultos,
    nonStop: processo.escalas
  })
  .then(function(response){
    var aux = []
    var minPriceId = null
    var minPriceVal = null
    var minTimeId = null
    var minTimeVal = null
    var i = 0, numOptionsExtra = 3
    response.result.data.forEach(info => {
        if(minPriceId == null){
           minPriceId = i
           minPriceVal = parseFloat(info.price.grandTotal)
          }
        else if(parseFloat(info.price.grandTotal) < minPriceVal){
          minPriceId = i
          minPriceVal = parseFloat(info.price.grandTotal)
        }
        
        var auxTime = new String(info.itineraries[0].duration)
        auxTime = auxTime.replace('PT', '')
        auxTime = auxTime.replace('H', '.')
        auxTime = parseFloat(auxTime)
        if(minTimeId == null){
          minTimeId = i
          minTimeVal = auxTime
        } 
        else if(auxTime < minTimeVal){
          minTimeId = i
          minTimeVal = auxTime
        }                 

        i++
      })
    aux.push(response.result.data[minPriceId])
    aux.push(response.result.data[minTimeId])
    for(var j = 1 ,  extras = 0; extras <numOptionsExtra; j++){
      if(j != minTimeId && j != minPriceId){
        aux.push(response.result.data[j])
        extras++
      }
    }
    return aux
  })
  .catch(function(error){
    console.log(error.response); //=> The response object with (un)parsed data
    console.log(error.response.request); //=> The details of the request made
    console.log(error.code); //=> A unique error code to identify the type of error
  });
}


//++++++++++++++++++Pesquisa de Hoteis+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getHotels(processo){
  if(processo.checkin == null && processo.checkout == null ){
    return [null, null, null, null, null]
  }
  
  return amadeus.shopping.hotelOffers.get({
    cityCode : processo.cidadedestino,
    checkInDate: processo.checkin,
    checkOutDate: processo.checkout,
    roomQuantity: processo.numadultos,
    radius: processo.radius,
    radiusUnit: 'KM'
  })
  .then(function (response) {
    var aux = []
    var minPriceId = null
    var minPriceVal = null
    var minDistId = null
    var minDistVal = null
    var i = 0, numOptionsExtra = 3
    response.result.data.forEach( info =>{
      if(minPriceId == null){
        minPriceId = i
        minPriceVal = parseFloat(info.offers[0].price.total)
       }
     else if(parseFloat(info.offers[0].price.total) < minPriceVal){
       minPriceId = i
       minPriceVal = parseFloat(info.offers[0].price.total)
     }

     if(minDistId == null){
      minDistId = i
      minDistVal = info.hotel.hotelDistance.distance
     }
    else if(info.hotel.hotelDistance.distance< minDistVal){
      minDistId = i
      minDistVal = info.hotel.hotelDistance.distance   
    }

     i++
    })
    aux.push(response.result.data[minPriceId])
    aux.push(response.result.data[minDistId])
    for(var j = 1 ,  extras = 0; extras <numOptionsExtra; j++){
      if(j != minDistId && j != minPriceId){
        aux.push(response.result.data[j])
        extras++
      }
    }
    return aux
  }).catch(function (response) {
    console.error(response);
  })
}

module.exports = {
    'getHotels' : getHotels,
    'getFlights' : getFlights
}
