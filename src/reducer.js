import { combineReducers } from 'redux'
import { reducer } from './index.redux'
import { auth } from './Auth.redux'

export default combineReducers({reducer, auth})