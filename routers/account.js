const express = require('express');
var router = express.Router();
const AccountModel= require('../models/account');
const { check,validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Tao tài khoản
router.post('/register',
    [check('username').notEmpty().withMessage('username khong duoc phep de trong'),
    check('password').notEmpty().withMessage('password khong duoc phep de trong')],
    (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    var Username = req.body.username;
    var Password = req.body.password;
    let encryptedPassword = '';
        
        bcrypt.genSalt(saltRounds, (err, salt) =>{
            bcrypt.hash(Password, salt, (err, hash) => {
                encryptedPassword = hash;  
                  AccountModel.findOne({
                    username: Username,
                })
                .then((data) => {
                    if (data) {
                        res.json('User nay da ton tai')
                    }   
                    else {
                        return AccountModel.create({
                            username: Username,
                            password: encryptedPassword,
                        })
                    }
                })
                .then(data => {
                    if (data) {
                        res.json('Tao tai khoan thanh cong')
                    }
                })    
                .catch((err) => {
                    res.status(500).json('Tao tai khoan that bai')
                });
            });
        });
  
})
// đăng nhập
router.post('/loginlougin', async (req, res, next) => {
    var Username = req.body.username
    var Password = req.body.password

    try {
        var account =await AccountModel.findOne({
            username: Username,
        })
        if (!account) {
                return res.status(501).json('Tài khoản không chính xác');
            }
        const checkPassword = bcrypt.compareSync(Password, account.password);
        if (!checkPassword) {
            return res.status(501).json('Mật khẩu không chính xác');
        }
        else return res.status(200).json('Dang nhap thanh cong');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Lấy dữ liệu từ database
router.get('/', (req, res, next) => {
    AccountModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
        res.status(500).json('Loi server')
        })
})
// lấy dữ liệu theo id
router.get('/:id', (req, res, next) => {
    var _id = req.params.id
    AccountModel.findById({_id})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
        res.status(500).json('Loi server')
        })
})


// Thêm mới dữ liệu vào db
router.post('/', (req, res, next) => { 
    var Username = req.body.username
    var Password= req.body.password
    
    AccountModel.create({
        username: Username,
        password: Password,
    })
        .then(data => {
        res.json('Them account thanh cong')
        })
        .catch(err => {
        res.status(500).json('Loi server')
    })
})
// Cập nhập dữ liệu trong db // doi mat khau
router.put('/:id', (req, res, next) => {
    var _id = req.params.id
    var NewPassword = req.body.newPassword
    AccountModel.findByIdAndUpdate(_id, {
        password: NewPassword
    }) 
        .then(data => {
            res.json('Update thanh cong nhe')
        })
        .catch(err => {
            res.status(500).json('Loi server')
    })
})

// Xóa dữ liệu trong db
router.delete('/:id', (req, res, next) => {
    var id=req.params.id
    AccountModel.deleteOne({
        _id:id
    })
        .then(data => {
        res.json('Xoa thanh cong')
        })
        .catch(err => {
        res.status(500).json('Loi server')
    })
})



module.exports= router