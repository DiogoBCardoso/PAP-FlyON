'user strict'

const express = require('express')
const routesApi = require('./routes/routes-webApi')
const routesApp = require('./routes/routes-webApp')
const sitemap = require('express-sitemap-html')
const bodyParser = require('body-parser')
const path = require('path');
var cors = require('cors');

let server

function init(done) {
    const app = express()

    app.set('view engine', 'hbs')
    app.set('views', './lib/views')

    //-----------------Configuaração Rotas---------------------------- 
    app.use(cors());
    app.use(express.static(__dirname + '/images'));
    app.use(express.urlencoded({extended: false}))


    //-----------------Rotas para os pedidos HTTP---------------------
    app.use('/FlyON/api', routesApi)
    app.use('/FlyON/', routesApp)
    app.get('/sitemap', sitemap(app))
    
    //---------------------Em caso de erro----------------------------
    app.use((err, req, resp, next) => {
        if(err.status) 
            resp.status(err.status)
        else (resp.status(500))
            resp.status(err.status || 500);
        resp.send({
            message: err.message,
            error: err
        });
       return;
        
    })

    const PORT = process.env.PORT || 8000
    server = app.listen(PORT, () => {
        console.log('Listening for HTTP requests on port '+ PORT)
        if (done) done()
    })   
    return app
}

function close() {
    server.close()
}

module.exports = { init, close }