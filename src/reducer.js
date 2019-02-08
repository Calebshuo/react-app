import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/userlist.redux'
import { chat } from './redux/chat.redux'
export default combineReducers({ user, chatuser, chat })