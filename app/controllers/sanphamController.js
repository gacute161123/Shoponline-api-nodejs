const SanphamModel = require('../models/sanphamModel');
const { check, validationResult } = require('express-validator');

// hiển thị tất cả sản phẩm
exports.getAll = (req, res, next) => {
    SanphamModel.find({ }).populate('danhmuc_id')
        .then(data => {
            res.json(data)
           
        })
        .catch(err => {
        res.status(500).json('Loi server 2')
    })
}

// tìm sản phẩm theo ID
exports.findProduct = (req, res, next) => {
    var _id = req.params.id
    SanphamModel.findById({ _id })
        .then(data => {
            if(data){
                res.json(data)
                }
        })
        .catch(err => {
        res.status(500).json('Loi server')
    })
}

// hiển thị danh sách sản phẩm theo id của danh muc
exports.displayProductsByIdCategory = (req, res, next) => {
    const Danhmuc_id = req.params.id
    SanphamModel.find({
        danhmuc_id:Danhmuc_id
    }).populate('danhmuc_id')
        .then(data => {
            if (data) {
                res.json(data)
            }
        })
        .catch(err => {
        res.status(500).json('Loi server')
    })
}

// tạo sản phẩm
exports.createProduct =  (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(500).json({ errors: errors.array() });
        }
    var Tensanpham = req.body.tensanpham
    var Dongia = req.body.dongia
    var Mota = req.body.mota
    var Soluong = req.body.soluong
    var Anhdaidien = req.body.anhdaidien
    var Danhmucid = req.body.danhmuc_id
    SanphamModel.findOne({
        tensanpham: Tensanpham,
    })
    .then(data => {
        if (data) {
        res.json('Sản phẩm này đã tồn tại')
        }   
        else {
           return SanphamModel.create({
            tensanpham: Tensanpham,
            dongia: Dongia,
            mota: Mota,
            soluong: Soluong, 
            anhdaidien: Anhdaidien,
            danhmuc_id: Danhmucid
        })
        }
    })
    .then(data => {
        if(data){
            res.json('Them moi san pham thanh cong')
        }
    })
    .catch(err => {
        res.status(500).json('Loi server')
    })
}

// sửa sản phẩm
exports.updateProduct = (req, res, next) => {
    var _id = req.params.id
    var Tensanpham = req.body.tensanpham
    var Dongia = req.body.dongia
    var Mota = req.body.mota
    var Soluong = req.body.soluong
    var Anhdaidien = req.body.anhdaidien
    var Danhmucid = req.body.danhmuc_id
    SanphamModel.findByIdAndUpdate(_id, {
       tensanpham: Tensanpham,
        dongia: Dongia,
        mota: Mota,
        soluong: Soluong, 
        anhdaidien: Anhdaidien,
        danhmuc_id: Danhmucid
    })
        .then(data => {
            if (data) {
            res.json('Update thanh cong nhe')
            }
            else {
                res.json("Update that bai")
            }
        })
        .catch(err => {
            res.status(500).json("Loi server")
    })
}

// xóa sản phẩm

exports.deleteProduct = (req, res, next) => {
    var id = req.params.id;
    SanphamModel.deleteOne({
        _id: id
    })
        .then(data => {
            if (data) {
                res.json('Xoa thanh cong');
            }
            else {
                res.json('Xoa that bai')
            }
        })
        .catch(err => {
        res.status(500).json('loiserver')
    })
}