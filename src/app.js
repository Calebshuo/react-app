import React from 'react'
import { Route,Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authrouter/authrouter'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

export default class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      hasError:false
    }
  }
  // 出错组件的父组件调用
  componentDidCatch(err,info) {
    console.log('err,info',err,info)
    this.setState({
      hasError:true
    })
  }
	render(){
		return this.state.hasError ? <h1>页面出错啦</h1> : (
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
          {/* Route with matched parameters */}
					<Route path='/chat/:user' component={Chat}></Route>
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
		)
	}
}