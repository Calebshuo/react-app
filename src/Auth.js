import React from 'react'
import { connect } from 'react-redux';
import { login, getUserData } from './Auth.redux';
import { Redirect } from 'react-router-dom';
// import axios from 'axios'

@connect(
  state=>state.auth,
  { login,getUserData }
)
class Auth extends React.Component {
  componentWillMount() {
    this.props.getUserData()
  }
  render() {
    return (
      <div>
        <h2>name is {this.props.user},age is {this.props.age}</h2>
        {this.props.isAuth ? <Redirect to='/dashboard'/> : null}
        <h2>Auth page need login</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth