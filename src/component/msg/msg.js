import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state=>state
)
class Msg extends React.Component {
  constructor(props) {
    super(props)
    this.lastmsg = this.lastmsg.bind(this)
  }
  lastmsg(arr) {
    return arr[arr.length-1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const chatid = {}
    this.props.chat.chatmsg.forEach(v=>{
      chatid[v.chatid] = chatid[v.chatid] || []
      chatid[v.chatid].push(v)
    })
    const chatIdArr = Object.values(chatid).sort((a,b)=>{
      return this.lastmsg(b).create_time - this.lastmsg(a).create_time
    })
    const userInfo = this.props.chat.users
    return (
      <div>
        {
          chatIdArr.map(v=>{
            const unread = v.filter(n=>!n.read && n.to === this.props.user._id
            ).length
            const authorid = this.lastmsg(v).from === this.props.user._id ? this.lastmsg(v).to : this.lastmsg(v).from
            return (
              <List key={v[0]._id}>
                <Item
                  thumb={require(`../img/${userInfo[authorid].avatar}.png`)}
                  extra={<Badge text={unread}></Badge>}
                  arrow='horizontal'
                  onClick={()=>this.props.history.push(`/chat/${authorid}`)}>
                  {this.lastmsg(v).content}
                  <Brief>{userInfo[authorid].name}</Brief>
                </Item>
              </List>
            )
          })
        }
      </div>
    )
  }
}

export default Msg