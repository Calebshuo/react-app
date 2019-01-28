const express = require('express')
const utils = require('utility')
const router = express.Router()
const model = require('./model')
const User = model.getModel('user')

router.get('/list', function(req, res) {
  User.find({}, function(err,doc) {
    return res.json(doc)
  })
})

router.post('/register', function(req, res) {
  console.log(req.body)
  const { user, pwd, type } = req.body
  User.findOne({user},function(e, d) {
    if (d) {
      return res.json({code:1,msg:'用户名已注册'})
    }
    User.create({ user, pwd:md5Pwd(pwd), type },function(e, d) {
      if (e) {
        return res.json({code:1,msg:'存储到数据库时出错'})
      }
      return res.json({code:0})
    })
  })
})

router.get('/info', function(req, res) {
  res.json({
    code:1
  })
})

function md5Pwd(pwd) {
  const salt = 'react_app'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = router