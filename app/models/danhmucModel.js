const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const DanhmucSchema = new Schema({
    tendanhmuc: {
        type: String,
        require: true,
        unique:true
    },
    mota: {
        type: String,
        required:true,
    }
}, {
    conllection: 'danhmuc',
    versionKey:false
});

const DanhmucModel = mongoose.model('danhmuc', DanhmucSchema)
module.exports= DanhmucModel