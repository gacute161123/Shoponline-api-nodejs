const express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
const { dbconnect } = require('./app/configs/dbConfig');
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/app/views');


dbconnect();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var accountRouter= require('./app/routes/accountRoute')
app.use('/api/account/', accountRouter)

var danhmuctRouter= require('./app/routes/danhmucRoute')
app.use('/api/danhmuc/', danhmuctRouter)

var sanphamRouter= require('./app/routes/sanphamRoute');
app.use('/api/sanpham/', sanphamRouter)

var uploadRoute = require('./app/routes/uploadRoute');
app.use('/api/upload/',uploadRoute)


app.use('/', express.static(path.join('./app/public')))
app.use('/api/danhmuc/',express.static(path.join('./app/public')))
app.use('/api/account/', express.static(path.join('./app/public')))
app.use('/api/sanpham/', express.static(path.join('./app/public')))


app.get('/', (req, res, next) => {
    //  res.sendFile(path.join(__dirname, '/app/views/sanpham.html'))
    res.render('index')
})

app.listen(3000, () => {
    console.log(`Server started on port`);
})