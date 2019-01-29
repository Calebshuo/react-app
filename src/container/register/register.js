import React from 'react'
import Logo from '../../component/logo/logo'
import { Button, WhiteSpace, Radio, WingBlank, List, InputItem, Toast }from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import '../../index.css'
import { Redirect } from 'react-router-dom'

@connect (
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type:'genuis'
    }
    // 使用bind或箭头函数绑定this
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleRegister() {
    this.props.register(this.state)
  }
  handleChange(key,val) {
    this.setState({
      [key]:val
    })
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
        <List>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <InputItem
            onChange={v=>this.handleChange('user',v)}
          >用户</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange={v=>this.handleChange('pwd',v)}
          >密码</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange={v=>this.handleChange('repeatpwd',v)}
          >确认密码</InputItem>
          <RadioItem
            onChange={()=>this.handleChange('type','genuis')}
            checked={this.state.type === 'genuis'}>牛人</RadioItem>
          <WhiteSpace/>
          <RadioItem 
            onChange={()=>this.handleChange('type','boss')}
            checked={this.state.type === 'boss'}>BOSS</RadioItem>
          <WhiteSpace/>
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register