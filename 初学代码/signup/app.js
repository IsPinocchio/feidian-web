var fs = require('fs')
var express = require('express')
var template = require('art-template')
var bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
var router = require('./router')

var app = express()

app.engine('html',require('express-art-template'))

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(router)

app.listen(3000,function(){
    console.log('running 3000 ... ')
})