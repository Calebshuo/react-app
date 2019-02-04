const  express = require('express')

const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket) { // io是全局，socket是本地址
  // console.log('user login')
  socket.on('communicate', function(data) {
    console.log(data)
    io.emit('servertalk', data)
  })
})
const userRouter = require('./user')



app.use(cookieParser())

app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(9093,function() {
  console.log('node app start at port 9093')
})