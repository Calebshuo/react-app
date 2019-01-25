import React from 'react'
import logoImg from './boy.png'
import './logo.css'

class Logo extends React.Component {
  render() {
    return (
      <div className="logo-container">
        <img src={logoImg}></img>
      </div>
    )
  }
}

export default Logo