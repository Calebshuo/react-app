import React, { Component } from 'react'
import { Button } from 'antd-mobile';
import {add, remove, asyncAdd} from './index.redux.js';
import { connect } from 'react-redux';

@connect(
  state=>({state : state}),
  { add, remove, asyncAdd }
)
class App extends React.Component {
  render() {
    return (
      <div>
        <h2>state count is {this.props.state}</h2>
        <Button onClick={this.props.add}>add</Button>
        <Button onClick={this.props.remove}>remove</Button>
        <Button onClick={this.props.asyncAdd}>asyncAdd</Button>
      </div>
    )
  }
}

export default App;
