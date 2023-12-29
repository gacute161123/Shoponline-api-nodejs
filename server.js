const express = require('express');
var app = express();
var bodyParser = require('body-parser')
const AccountModel = require('./models/account')
const DanhmucModel = require('./models/danhmuc')
const SanphamModel= require('./models/sanpham')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var accountRouter= require('./routers/account')
app.use('/api/account/', accountRouter)

var danhmuctRouter= require('./routers/danhmuc')
app.use('/api/danhmuc/', danhmuctRouter)

var sanphamRouter= require('./routers/sanpham')
app.use('/api/sanpham/', sanphamRouter)


app.get('/', (req, res, next) => {
    res.json('HOME') 
})


app.listen(3000, () => {
    console.log(`Server started on port`);
})