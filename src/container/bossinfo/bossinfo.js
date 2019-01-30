import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WingBlank, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { update }
)
class BossInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: 'boy'
    }
    this.saveInfo = this.savaInfo.bind(this)
  }

  onChange (key, val) {
    this.setState({
      [key]: val
    })
  } 

  savaInfo () {
    // setState是异步的，所以下面这段代码起到的作用是第二次点击提交按钮才会发生跳转（第一次不满足下面jsx的判断）
    // if (this.state.avatar === "") {
    //   this.setState({
    //     avatar: 'boy'
    //   })
    // }
    this.props.update(this.state)
  }
 
  render () {
    const path = this.props.location.pathname  // 路由组件给的
    const redirect = this.props.redirectTo
    return (
      <div>
        {/* 因为一上来是bossinfo页面，所以加判断 */}
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar
          mode="dark">
          BOSS完善信息页面
        </NavBar>
        <AvatarSelector
          selectAvatar={v => this.onChange('avatar', v)}/>
        <InputItem
          clear
          onChange={v => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem
          clear
          onChange={v => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem
          clear
          onChange={v => this.onChange('money', v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          title='职位要求'
          rows={3}
          autoHeight
          onChange={v => this.onChange('desc', v)}>
        </TextareaItem>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button
            onClick={this.saveInfo}
            type='primary'>保存</Button>
        </WingBlank>
      </div>
    )
  }
}

export default BossInfo
