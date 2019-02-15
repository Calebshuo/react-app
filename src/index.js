import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createStore } from './custom-redux'
import { Provider } from './custom-react-redux';
import { BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch
} from "react-router-dom";

import Auth from './Auth'
import Dashboard from './Dashboard'
import './config'

import reducer from './reducer';
// import { reducer } from './index.redux'
import { Button } from 'antd-mobile';
import PropTypes from 'prop-types'
import App from './App'

// const store = createStore(reducer, compose(
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App/>
    {/* <Router>
      <Switch>
        <Route path='/login'  component={App} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect to='/dashboard' />
        <Route path='/:location' component={Test} />
      </Switch>
    </Router> */}
  </Provider>,
  document.getElementById('root')
);

