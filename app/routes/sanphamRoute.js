const express = require('express');
var router = express.Router();
const SanphamModel = require('../models/sanphamModel');
const { check,validationResult } = require('express-validator');
var sanphamcontrollers = require('../controllers/sanphamController');


// hien thi tat ca san pham
router.get('/', sanphamcontrollers.getAll);


// tìm sản phẩm theo id
router.get('/:id', sanphamcontrollers.findProduct);

// hien thi danh sach san pham theo id danh muc 
router.get('/danhmuc/:id', sanphamcontrollers.displayProductsByIdCategory);

 // tao moi san pham
router.post('/taomoi',
    [check('tensanpham').notEmpty().withMessage('Ten san pham khong duoc phep de trong'),
    check('dongia').notEmpty().withMessage('Don gia khong duoc phep de trong'),
    check('mota').notEmpty().withMessage('Mo ta khong duoc phep de trong'),
    check('soluong').notEmpty().withMessage('So luong khong duoc phep de trong'),
    check('anhdaidien').notEmpty().withMessage('Anh dai dien khong duoc phep de trong'),
    check('danhmuc_id').notEmpty().withMessage('ID cua Danh muc khong duoc phep de trong')],
    sanphamcontrollers.createProduct
);


//Sua san pham
router.put('/:id', sanphamcontrollers.updateProduct)
// xoa san pham
router.delete('/:id', sanphamcontrollers.deleteProduct);


module.exports = router