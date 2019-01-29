const express = require('express')
const utils = require('utility')
const router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {pwd:0, __v:0}

router.get('/list', function(req, res) {
  // User.remove({}, function(e,d){})
  User.find({}, function(err,doc) {
    return res.json(doc)
  })
})

router.post('/register', function(req, res) {
  const { user, pwd, type } = req.body
  User.findOne({user},function(e, d) {
    if (d) {
      return res.json({code:1,msg:'用户名已注册'})
    }
    const newUser = new User({ user, pwd:md5Pwd(pwd), type })
    newUser.save(function(e,d) {
      if (e) {
        return res.json({code:1,msg:'存储到数据库时出错'})
      } else {
        res.cookie('userid', d._id)
        return res.json({code:0})
      }
    })
    //不用create方法是因为id只有存了之后才有
    // User.create({ user, pwd:md5Pwd(pwd), type },function(e, d) {
    //   if (e) {
    //     return res.json({code:1,msg:'存储到数据库时出错'})
    //   }
    //   return res.json({code:0})
    // })
  })
})

router.post('/login', function(req, res) {
  const { user, pwd } = req.body
  // 不返回pwd
  User.findOne({user, pwd:md5Pwd(pwd)},_filter,function(e, d) {
    if (!d) {
      return res.json({code:1,msg:'用户名不存在或密码不正确'})
    }
    res.cookie('userid', d._id) // 写cookie在response里写
    return res.json({code:0,data:d})
  })
})

router.get('/info', function(req, res) {
  const { userid } = req.cookies  // 读cookie在request里读
  if (!userid) {
    res.json({
      code:1
    })
  }
  User.findOne({_id:userid}, _filter, function(e,d){
    if (e) {
      return res.json({code:1,msg:"后端出错了"})
    } else {
      return res.json({code:0,data:d})
    }
  })
})

function md5Pwd(pwd) {
  const salt = 'react_app'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = router