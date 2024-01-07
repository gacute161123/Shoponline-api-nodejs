const AccountModel = require('../models/accountModel');
const { check,validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const path = require('path')
const ejs = require('ejs')

// tạo tài khoản
const register = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    var Username = req.body.username;
    var Password = req.body.password;
    var Role = req.body.role;
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
                            role: Role,
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
}

// đăng nhập
const postlogin =  async (req, res, next) => {
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
        else {
            var token = jwt.sign({
                _id: account._id
            }, 'gacute')
            return res.json({
                message:'Dang nhap thanh cong',
                token: token
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getlogin = (req, res, next) => {
    // res.sendFile(path.resolve('./app/views/login.ejs'))
    res.render('login')
};


const checklogin = (req, res, next) => {
    try {
        // check login
        var token = req.cookies.token;
        var idaccount = jwt.verify(token, 'gacute')
        // kiểm tra xem id đúng bên mình hay còn tồn tại không
        AccountModel.findOne({
            _id:idaccount
        })
            .then(data => {
                if (data) {
                    req.data = data;
                    next();
                }
                else  res.json('BAN KHONG CO QUYEN')
            })
            .catch(err => {
               
        })
    
    } catch (err) {
        // nếu chưa đăng nhập thì nó cho về trang login // token không hợp lệ
        return res.status(500).json('Bạn chưa đăng nhập ')
        // return res.redirect('/api/account/login')
  }
}
const checksanpham = (req, res, next) => {
    if (req.data.role<=1 ) {
        next()
    }
    else {
        res.json('Bạn Không Đủ Quyền vui lòng đăng nhập tài khoản người dùng có role =1')
    }
}
const checkdanhmuc = (req, res, next) => {
    if (req.data.role <=1) {
        next()
    }
    else {
        res.json('Bạn Không Đủ Quyền vui lòng đăng nhập tài khoản người dùng có role =1')
    }
}
const checkadmin = (req, res, next) => {
    if (req.data.role ==0) {
        next()
    }
    else {
        res.json('Bạn Không Đủ Quyền Vui Lòng đăng nhập tài khoản admin có role =0')
    }
}

// lấy ra tất cả thông tin
const getAll = (req, res, next) => {
    AccountModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
        res.status(500).json('Loi server')
        })
}

// lấy ra dữ liệu theo id
const getId = (req, res, next) => {
    var _id = req.params.id
    AccountModel.findById({_id})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
        res.status(500).json('Loi server')
        })
}

// thêm tài khoản
const addAccount = (req, res, next) => { 
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
}

// đổi mật khẩu
const changePassword = (req, res, next) => {
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
}
const deleteAccount = (req, res, next) => {
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
}


module.exports = {
    register,
    getlogin,
    postlogin,
    getAll,
    getId,
    addAccount,
    changePassword,
    deleteAccount,
    checklogin,
    checksanpham,
    checkdanhmuc,
    checkadmin
}