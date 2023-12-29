const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Example')
const Schema = mongoose.Schema;

const SanphamSchema = new Schema({
    tensanpham: {
        type: String,
        require: true,
        unique:true
    },
    dongia: {
        type: Number,
        require: true,
    },
    mota: {
        type: String,
        require: true,
    },
    soluong: {
        type: Number,
        require: true,
    },
    anhdaidien: {
        type: String,
        require: true,
    },
    danhmuc_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'danhmuc'
    },
}, {
    conllection: 'sanpham',
    versionKey:false
});
const SanphamModel = mongoose.model('sanpham', SanphamSchema)
module.exports= SanphamModel