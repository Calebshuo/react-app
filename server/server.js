const  express = require('express')

const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')
function isOpen(ws) { return ws.readyState === ws.OPEN }
io.on('connection', function(socket) { // io是全局，socket是本地址
  console.log('user login')
  socket.on('sendmsg', function(data) {
    const { from, to, msg } = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg}, function(err,doc) {
      if (!isOpen(socket)) return;
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})
const userRouter = require('./user')



app.use(cookieParser())

app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(9093,function() {
  console.log('node app start at port 9093')
})