import React, { Component } from 'react';
import { Button } from 'antd-mobile';


class App extends React.Component {
  render() {
    return (
      <div>
        <Hello></Hello>
        <h2>World</h2>
        <Talk name='abc'></Talk>
      </div>
    )
  }
}
function Talk(props) {
  return (<div>
    <h1>talk,{props.name}</h1>
    <Button type="primary">push</Button>
  </div>)
         
}

class Hello extends React.Component {
  render() {
    let name = 'ls'
    return <h2> hello{name}</h2>
  }
}
export default App;
