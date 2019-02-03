import React from 'react'
import Logo from '../../component/logo/logo'
import { Button, WhiteSpace, Radio, List, InputItem }from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import reactForm from '../../component/react-form/react-form'

@reactForm
@connect (
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    // 使用bind或箭头函数绑定this
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount() {
    this.props.handleChange('type','genius')
  }
  handleRegister() {
    this.props.register(this.props.state)
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
            onChange={v=>this.props.handleChange('user',v)}
          >用户</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange={v=>this.props.handleChange('pwd',v)}
          >密码</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange={v=>this.props.handleChange('repeatpwd',v)}
          >确认密码</InputItem>
          <RadioItem
            onChange={()=>this.props.handleChange('type','genius')}
            checked={this.props.state.type === 'genius'}>牛人</RadioItem>
          <WhiteSpace/>
          <RadioItem 
            onChange={()=>this.props.handleChange('type','boss')}
            checked={this.props.state.type === 'boss'}>BOSS</RadioItem>
          <WhiteSpace/>
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register