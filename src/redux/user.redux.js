import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  isAuth:false,
  msg:'',
  user:'',
  pwd:'',
  type:''
}

export function user(state=initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return { ...state, ...action.payload, msg: '', isAuth: true }
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth:false }
    default:
      return state
  }
}
