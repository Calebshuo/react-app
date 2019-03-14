import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// list
const MSG_LIST = 'MSG_LIST'
//receive
const MSG_RECV = 'MSG_RECV'
//read
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg:[],
  users: {},
  unread:0
}

export function chat(state=initState,action){
  switch(action.type){
      case MSG_LIST:
          return {...state, users: action.payload.users,chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.toid).length}
      case MSG_RECV:
          const n = action.toid===action.msg.to? 1 : 0
          const chatmsg = action.msg.to == action.toid || action.msg.from == action.toid ? [...state.chatmsg, action.msg] : [...state.chatmsg]
          return {...state, chatmsg:chatmsg, unread:state.unread+n} 
      case MSG_READ:
          return {...state, chatmsg:state.chatmsg.map(v=>({...v,read: v.from===action.payload.from?true:v.read})), unread:state.unread-action.payload.num}
      default:
          return state
  }
}

function msgList(msgs, users, toid) {
  return { toid, type:MSG_LIST, payload:{ msgs, users } }
}

function msgRecv(msg,toid){
  return {toid,type:MSG_RECV,msg}
}


function msgRead(from,num) {
  return {type:MSG_READ,payload:{from,num}}
}

<<<<<<< HEAD
export function recvMsg(){
  return (dispatch,getState)=>{
      socket.on('recvmsg',function(data){
          const toid = getState().user._id
          dispatch(msgRecv(data,toid))
      })
  }
}

=======
>>>>>>> c90fa2c... 3.14 last review
export function sendMsg({from ,to ,msg}){
  return dispatch=>{
      socket.emit('sendmsg',{from,to,msg})
  }
}

export function readMsg(from) {
<<<<<<< HEAD
  return async(dispatch,getState)=>{
    const userid = getState().user._id
    const res = await axios.post('/user/readmsg',{from})
    if(res.status===200&&res.data.code===0) {
      dispatch(msgRead(from,userid,res.data.num))
    }
=======
  return (dispatch,getState)=>{
    axios.post('/user/readmsg',{from})
      .then(res=>{
        if(res.status===200&&res.data.code===0) {
          dispatch(msgRead(from,res.data.num))
        }
      })
>>>>>>> c90fa2c... 3.14 last review
  }
}

export function recvMsg(){
  return (dispatch,getState)=>{
      socket.on('recvmsg',function(data){
          const toid = getState().user._id
          dispatch(msgRecv(data,toid))
      })
  }
}

export function getMsgList() {
  return (dispatch,getState)=>{
    axios.get('/user/getmsglist')
      .then(res=>{
          if (res.status===200&&res.data.code===0) {
            const toid = getState().user._id
            dispatch(msgList(res.data.msgs, res.data.users, toid))
          }
        }
      )
  }
}