import axios from 'axios'
import { getRedirectPath } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
  msg:'',
  user:'',
  type:''
}

export function user(state=initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return { ...state, ...action.payload, redirectTo:getRedirectPath(action.payload), msg: '' }
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth:false }
    case LOGOUT:
      return {...initState}
    default:
      return state
  }
}

function authSuccess (data) {
  return { type: AUTH_SUCCESS, payload: data }
}

function errorMsg(msg) {
  return { msg, type:ERROR_MSG }
}

export function loadData(userinfo) {
  return { payload:userinfo, type:LOAD_DATA }
}

export function login({user,pwd}) {
  if (!user || !pwd) {
    return errorMsg('请输入用户名或密码')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code ===0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function logout() {
  return dispatch => dispatch({ type: LOGOUT})
}

// 函数参数的解构赋值
export function register({user, pwd, repeatpwd, type}) { 
  if (!user || !pwd ||!repeatpwd) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type})
      .then(res => {
        if (res.status === 200 && res.data.code ===0) {
          dispatch(authSuccess({user, type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}


export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}