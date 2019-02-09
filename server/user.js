const express = require('express')
const utils = require('utility')
const router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {pwd:0, __v:0}

const Chat = model.getModel('chat')

router.get('/list', function(req, res) {
  // User.remove({}, function(e,d){})
  const { type } = req.query
  User.find({type}, function(err,doc) {
    return res.json({code:0,data:doc})
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
        res.cookie('userid', d._id) // cookie里只存一个id
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

router.post('/update', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({
      code: 1,
      msg: 'cookie中没有找到userid字段。请重新登录后再次尝试'
    })
  }
  // console.log('############req',req.body)
  const body = req.body
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({
      code: 0,
      data
    })
  })
})

router.get('/info', function(req, res) {
  const { userid } = req.cookies  // 读cookie在request里读
  if (!userid) {
    return res.json({
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

router.get('/getmsglist',function(req,res){
  const user = req.cookies.userid
  User.find({},function(e,userdoc){
    //转成对象形式返回
    let users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user,avatar:v.avatar}
    })
    // 不需要把所有聊天记录都拿出来，提高效率
    Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
      if(!err){
        return res.json({code:0,msgs:doc,users:users})
      }
    })
})
})

module.exports = router