import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import App from './App';
import { connect } from 'react-redux';
import { logout } from './Auth.redux';
import Auth from './Auth'

function About () {
  return <h2>About</h2>
}

class Users extends React.Component {
  render() {
    return <h1>Hello</h1>
  }
}

@connect(
  state=>state.auth,
  { logout }
)
class Dashboard extends React.Component {
  render() {
    const redirectToLogin = <Redirect to='/login' />
    const app = (
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/dashboard'>Home</Link>
            </li>
            <li>
              <Link to='/dashboard/about/'>About</Link>
            </li>
            <li>
              <Link to='/dashboard/users/'>Users</Link>
            </li>
          </ul>
        </nav>
        <Route path='/dashboard' exact component={App}/>
        <Route path='/dashboard/about/' component={About}/>
        <Route path='/dashboard/users/' component={Users}/>
        <button onClick={this.props.logout}>注销</button>
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin
  }
}

export default Dashboard