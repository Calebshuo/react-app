import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from './woniu-react-redux';
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

class Parent extends React.Component{
  static childContextTypes = {
    msg: PropTypes.string
  }
  getChildContext() {
    return this.state
  }
  state = {
    msg: 'start'
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        msg: 'end'
      });
    }, 1000);
  }

  render() {
    return <Child_1/>;
  }
}

class Child_1 extends React.Component{
  render() {
    return (
    <div>
      <Child_1_1/>
    </div>
    )
  }
}

class Child_1_1 extends React.Component{
  static contextTypes = {
    msg: PropTypes.string
  }
  render() {
    console.log(this.context)
    return <p>{this.context.msg}</p>
  }
}



function createStore(reducer) {
  let state
  let arr = []
  function getState() {
    return state
  }
  function subscribe(func) {
    arr.push(func)
  }
  function dispatch(action) {
    state = reducer(state,action)
    arr.map(v=>v())
  }
  dispatch({type:'abc'})
  return { getState, subscribe, dispatch }
}
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

