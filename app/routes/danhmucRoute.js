const express = require('express');
var router = express.Router() 
const DanhmucModel = require('../models/danhmucModel');
const { check,validationResult } = require('express-validator');
var danhmuccontrollers = require('../controllers/danhmucController');

// hien thi cac danh muc
router.get('/',danhmuccontrollers.getAll)
// tìm danh muc theo id
router.get('/:id',danhmuccontrollers.getId)
// tao moi danh muc
router.post('/taomoi',
    [check('tendanhmuc').notEmpty().withMessage('ten danh muc khong duoc phep de trong'),
        check('mota').notEmpty().withMessage('mo ta khong duoc phep de trong')],
    danhmuccontrollers.createCategory
)

// sua
router.put('/:id', danhmuccontrollers.updateCategory)
// xoa
router.delete('/:id', danhmuccontrollers.deleteCategory)

module.exports = router