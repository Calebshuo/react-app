import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './index.redux.js';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

function About () {
  return <h2>About</h2>
}

class Users extends React.Component {
  render() {
    return <h1>Hello</h1>
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>
        {/* <Redirect to="/about"/> */}
        <Route path="/" exact component={App} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
