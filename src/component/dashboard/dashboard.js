import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLink from '../navlink/navlink'

function Boss() {
  return <h2>Boss首页</h2>
}
function Genius() {
  return <h2>牛人首页</h2>
}
function Msg() {
  return <h2>消息列表页面</h2>
}
function User() {
  return <h2>个人中心页面</h2>
}

@connect(
  state => state
)
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const pathName = this.props.location.pathname
    const user = this.props.user;
    const navList = [
        {
            path:'/boss',
            text:'牛人',
            icon:'boss',
            title:'牛人列表',
            component:Boss,
            hide:user.type == 'genuis'
        },
        {
            path:'/genius',
            text:'boss',
            icon:'job',
            title:'BOSS列表',
            component:Genius,
            hide:user.type == 'boss'
        },
        {
            path:'/msg',
            text:'消息',
            icon:'msg',
            title:'消息列表',
            component:Msg
        },
        {
            path:'/me',
            text:'我',
            icon:'user',
            title:'个人中心',
            component:User
        }
    ]
    return (
      <div>
        <NavBar mode='dark'>{navList.find(v=>v.path === pathName).title}</NavBar>
        <NavLink data={navList} style={{position:"fixed",bottom:0}}></NavLink>
      </div>
    )
  }
}

export default Dashboard