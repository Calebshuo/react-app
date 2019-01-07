import React, { Component } from 'react'
import { Button } from 'antd-mobile';

class App extends React.Component {
  render() {
    const store = this.props.store
    const add = this.props.add()
    const remove = this.props.remove()
    return (
      <div>
        <h2>state count is {store.getState()}</h2>
        <Button onClick={() => {store.dispatch(add)}}>Add</Button>
        <Button onClick={() => {store.dispatch(remove)}}>remove</Button>
      </div>
    )
  }
}

export default App;
