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
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashbord from './component/dashboard/dashboard'
import './index.css'
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={Dashbord}></Route>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

