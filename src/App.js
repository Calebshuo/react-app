import React, { Component } from 'react'
import { Button } from 'antd-mobile';
import {add, remove, asyncAdd} from './index.redux.js';
import { connect } from './woniu-react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        {console.log(this.props)}
        <h2>state count is {this.props.num}</h2>
        <Button onClick={this.props.add}>add</Button>
        <Button onClick={this.props.remove}>remove</Button>
        <Button onClick={this.props.asyncAdd}>asyncAdd</Button>
        <h2>占位占位</h2>
      </div>
    )
  }
}

App = connect(
  state=>state.reducer,
  {add, remove, asyncAdd}
)(App)

export default App;
