import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
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

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))


// class Test extends React.Component {
//   render() {
//     console.log(this.props)
//     return <h1>test,{this.props.match.params.location}</h1>
//   }
// }


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/login'  component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect to='/dashboard' />
        {/* <Route path='/:location' component={Test} /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
