import React from 'react'
import Logo from '../../component/logo/logo'
import { Button, WhiteSpace, Radio, WingBlank, List, InputItem, Toast }from 'antd-mobile'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type:'genuis'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleRegister() {
    console.log(this.state)
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
        <Logo></Logo>
        <List>
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