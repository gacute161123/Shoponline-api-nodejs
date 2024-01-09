const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SanphamSchema = new Schema({
    tensanpham: {
        type: String,
        unique:true
    },
    dongia: {
        type: Number,
    },
    mota: {
        type: String,
    },
    soluong: {
        type: Number,
    },
    anhdaidien: {
        type: String,
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