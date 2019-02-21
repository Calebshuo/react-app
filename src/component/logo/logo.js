import React from 'react'
import './logo.css'

class Logo extends React.Component {
  render() {
    return (
      <div className="logo-container">
        <img src={require('./job.png')} width='250px' alt=''></img>
      </div>
    )
  }
}

export default Logo