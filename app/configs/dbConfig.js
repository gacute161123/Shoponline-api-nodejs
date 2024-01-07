const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://127.0.0.1/Example';
mongoose.Promise = global.Promise;
const dbconnect = () => mongoose.connect(MONGO_URI, {}).catch(err => {
    setTimeout(db_connect, 5000)
});
module.exports = { dbconnect }