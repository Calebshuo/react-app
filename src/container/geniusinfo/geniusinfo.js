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
class GeniusInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      avatar: 'boy'
    }
  }
  onChange (key, val) {
    this.setState({
      [key]: val
    })
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
          牛人完善信息页面
        </NavBar>
        <AvatarSelector
          selectAvatar={v => this.onChange('avatar', v)}/>
        <InputItem
          clear
          onChange={v => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <TextareaItem
          title='个人简介'
          rows={3}
          autoHeight
          onChange={v => this.onChange('desc', v)}>
        </TextareaItem>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button
            onClick={()=>this.props.update(this.state)}
            type='primary'>保存</Button>
        </WingBlank>
      </div>
    )
  }
}

export default GeniusInfo
