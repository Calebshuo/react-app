const  express = require('express')
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function() {
  console.log('success')
})
const User = mongoose.model('user', new mongoose.Schema({
  user:{type:String,require:true},
  age:{type:Number,require:true}
}))
User.create({
  user:'aa',
  age:23
},function(err, doc){
  if(!err) {
    console.log(doc)
  } else {
    console.log(err)
  }
})
const app = express()

// User.update({'user':'ls'},{'$set':{age:24}},function(err,doc){
//   console.log(doc)
// })

// User.remove({age:18},function(err,doc){
//    console.log(doc)
// })

app.get('/',function(req,res) {
  res.send('<h1>111</h1>')
})

app.get('/data',function(req,res) {
  User.find({'user':'aa'},function(err,doc){
    res.json(doc)
  })
})

app.listen(9093,function() {
  console.log(2222)
})