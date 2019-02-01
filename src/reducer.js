import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/userlist.redux'
export default combineReducers({ user, chatuser })