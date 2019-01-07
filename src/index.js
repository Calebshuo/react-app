import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore} from 'redux';
import {reducer, add, remove} from './index.redux.js';

const store = createStore(reducer)

function render() {
  ReactDOM.render(<App store={store} add={add} remove={remove}/>, document.getElementById('root'));
}

render()

store.subscribe(render)

serviceWorker.unregister();
