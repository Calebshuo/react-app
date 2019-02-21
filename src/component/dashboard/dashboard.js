import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLink from '../navlink/navlink'
import { Switch, Route, Redirect } from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import UserCenter from '../usercenter/usercenter'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import Msg from '../msg/msg'

@connect(
  state => state,
  { getMsgList, recvMsg}
)
class Dashboard extends React.Component {
  componentDidMount() {
    // 防止调用多次事件监听器
    if (this.props.chat.chatmsg.length===0) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
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
            component: Boss,
            hide:user.type === 'genius'
        },
        {
            path:'/genius',
            text:'boss',
            icon:'job',
            title:'BOSS列表',
            component:Genius,
            hide:user.type === 'boss'
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
            component:UserCenter
        }
    ]
    const page = navList.find(v=>v.path === pathName)
    return (
      page ? 
      <div>
        <NavBar mode='dark'>{page.title}</NavBar>
        <div style={{marginTop:45, marginBottom:85}}>
          <Switch>
            {navList.map(v=>
              <Route
                key={v.path}
                path={v.path}
                component={v.component}
              ></Route>
            )}
          </Switch>
        </div>
        <NavLink data={navList}></NavLink>
      </div> : <Redirect to='/msg'></Redirect>
    )
  }
}

export default Dashboard