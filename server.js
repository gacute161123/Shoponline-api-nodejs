const express = require('express');
var app = express();
var bodyParser = require('body-parser')
const AccountModel = require('./models/account')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var accountRouter= require('./routers/account')
app.use('/api/account/', accountRouter)

app.get('/', (req, res, next) => {
    res.json('HOME')
})
app.listen(3000, () => {
    console.log(`Server started on port`);
})