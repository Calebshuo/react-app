import React, { Component } from 'react'
import { Button } from 'antd-mobile';
import {add, remove, asyncAdd, addTwice} from './index.redux.js';
import { connect } from './custom-react-redux';

class App extends Component {
  render() {
    // this.props.addTwice ? console.log('###app',this.props.addTwice.toString()) : console.log(1234)
    return (
      <div>
        <h2>state count is {this.props.num}</h2>
        <Button onClick={this.props.add}>add</Button>
        <Button onClick={this.props.remove}>remove</Button>
        <Button onClick={this.props.asyncAdd}>asyncAdd</Button>
        <Button onClick={this.props.addTwice}>addTwice</Button>
        <h2>占位占位</h2>
      </div>
    )
  }
}

App = connect(
  state=>state.reducer,
  {add, remove, asyncAdd, addTwice}
)(App)

export default App;
