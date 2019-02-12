import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch
} from "react-router-dom";

import Auth from './Auth'
import Dashboard from './Dashboard'
import reducers from './reducer';
import './config'

import { reducer } from './index.redux';
import { Button } from 'antd-mobile';

// const store = createStore(reducer, compose(
//   applyMiddleware(thunk),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

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
// class Test extends React.Component {
//   render() {
//     console.log(this.props)
//     return <h1>test,{this.props.match.params.location}</h1>
//   }
// }

class App extends React.Component {
  render() {
    return (
      <div>
        {/* click时间绑定的是函数体，不执行的函数体 */}
        <h2>state count is {store.getState()}</h2>
        <Button onClick={()=>store.dispatch({type:'add'})}>add</Button>
        <Button onClick={()=>store.dispatch({type:'remove'})}>remove</Button>
        <Button onClick={()=>setTimeout(() => {store.dispatch({type:'add'})}, 2000)}>asyncAdd</Button>
      </div>
    )
  }
}

const render = ()=>ReactDOM.render(
  <App></App>,
  document.getElementById('root')
)
store.subscribe(render)
render()
// ReactDOM.render(
//   <Provider store={store}>
//     <Router>
//       <Switch>
//         <Route path='/login'  component={App} />
//         {/* <Route path='/dashboard' component={Dashboard} />
//         <Redirect to='/dashboard' /> */}
//         {/* <Route path='/:location' component={Test} /> */}
//       </Switch>
//     </Router>
//   </Provider>,
//   document.getElementById('root')
// );

serviceWorker.unregister();
