import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch
} from "react-router-dom"
import Login from './container/login/login'
import Register from './container/register/register'
import reducers from './reducer'
import './config'
import AuthRoute from'./component/authrouter/authrouter'
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
function Boss () {
  return <h2>Boss</h2>
}
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path='/boss' component={Boss}></Route>
        <AuthRoute></AuthRoute>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

