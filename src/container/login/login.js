import React from 'react'
import Logo from '../../component/logo/logo'
import { Button, WhiteSpace, WingBlank, List, InputItem, Toast, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect (
  state => state.user,
  { login }
)
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd:''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register() {
    // console.log(this.props) // 路由组件包含的一些属性
    this.props.history.push('/register')
  }
  handleLogin() {
    this.props.login(this.state)
  }
  handleChange(key,val) {
    this.setState({
      [key]:val
    })
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
        <h2>登录页</h2>
        <WingBlank size='sm'>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem
              onChange={v=>this.handleChange('user',v)}
            >用户</InputItem>
            <WhiteSpace/>
            <InputItem
              onChange={v=>this.handleChange('pwd',v)}
              type='password'
            >密码</InputItem>
          </List>
          <Button type='primary' onClick={this.handleLogin}>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login