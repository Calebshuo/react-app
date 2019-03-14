import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import csshook from 'css-modules-require-hook/preset'
import assetHook from 'asset-require-hook'
assetHook({
    extensions: ['png']
})
import App from '../src/app.js'
import { StaticRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../src/reducer'
import thunk from 'redux-thunk'
import staticPath from '../build/asset-manifest.json'

// console.log("staticPath",staticPath)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')
<<<<<<< HEAD



io.on('connection', function(socket) { // io是全局，socket是本地址
=======
io.on('connection', function(socket) { // io是全局，socket是当前这次连接（io.emit：全局emit的事件所有socket都可以监听到。）
>>>>>>> c90fa2c... 3.14 last review
  console.log('user login')
  socket.on('sendmsg', function(data) {
    const { from, to, msg } = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg}, function(err,doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})
const userRouter = require('./user')



app.use(cookieParser())

app.use(bodyParser.json())

app.use('/user', userRouter)
// function App() {
//   return <h2>111111</h2>
// }
// console.log('renderToString(App())',renderToString(App()))
const path = require('path')
// js、css的请求会发到/build/static/xxxx.js
app.use(express.static(path.resolve('build')))
app.use(function(req, res, next){
  const context = {}
  const store = createStore(reducers, compose(
    applyMiddleware(thunk),
  ))
  const markup = renderToString(
    (<Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
    >
        <App></App>
      </StaticRouter>
    </Provider>)
  )
  const page = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <link rel="stylesheet" href="${staticPath['main.css']}">
      <link rel="stylesheet" href="${staticPath['static/css/1.5a90b03a.chunk.css']}">
      <meta name="description" content="React-App" />
      <meta name="keywords" content="React,Redux,SSR,React-router,Socket.io" />
      <meta name="author" content="Imooc" >
      <title>Redux+React Router+Node.js全栈开发聊天App</title>

    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${markup}</div>
      <script src="${staticPath['main.js']}"></script>
      <script src="${staticPath['static/js/1.e59bc5bb.chunk.js']}"></script>
      <script src="${staticPath['runtime~main.js']}"></script>
      <script src="${staticPath['precache-manifest.0035b5c80fe6f9193c05b58b29b54b6c.js']}"></script>
    </body>
  </html>
  `
  if(req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  return res.send(page)
  // 需要有请求组件的处理函数
  // return res.sendFile(path.resolve('build/index.html'))
})

server.listen(9093,function() {
  console.log('node app start at port 9093')
})