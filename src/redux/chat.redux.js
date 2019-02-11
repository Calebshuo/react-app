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
          const n = action.toid===action.msgs.to? 1 : 0
          return {...state, chatmsg:[...state.chatmsg, action.msgs], unread:state.unread+n}
      case MSG_READ:
          return {...state, chatmsg:state.chatmsg.map(v=>({...v,read: v.from===action.payload.from?true:v.read})), unread:state.unread-action.payload.num}
      default:
          return state
  }
}

function msgList(msgs, users, toid) {
  return { toid, type:MSG_LIST, payload:{ msgs, users } }
}

function msgRecv(msgs,toid){
  return {toid,type:MSG_RECV,msgs}
}


function msgRead(from,userid,num) {
  return {type:MSG_READ,payload:{from,userid,num}}
}

export function recvMsg(){
  return (dispatch,getState)=>{
      socket.on('recvmsg',function(data){
          const toid = getState().user._id
          dispatch(msgRecv(data,toid))
      })
  }
}

export function sendMsg({from ,to ,msg}){
  return dispatch=>{
      socket.emit('sendmsg',{from,to,msg})
  }
}

export function readMsg(from) {
  return (dispatch,getState)=>{
    axios.post('/user/readmsg',{from})
      .then(res=>{
        if(res.status===200&&res.data.code===0) {
          const userid = getState().user._id
          dispatch(msgRead(from,userid,res.data.num))
        }
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