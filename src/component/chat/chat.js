import React from 'react'
import { connect } from 'react-redux'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { getMsgList, recvMsg, sendMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
import QueueAnim from 'rc-queue-anim'

@connect (
  state=>state,
  { getMsgList, recvMsg, sendMsg, readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text:'', msg:[] }
  }
  componentDidMount() {
    // socket.on('servertalk', data=>{
    //   this.setState({msg:[...this.state.msg,data]})
    // })
    // 进了chat又退出，redux已经有数据了再进chat就不需要重新获取数据了（不管和哪个用户聊天都一样，因为获取的数据都是和本地id有关的）
    if (this.props.chat.chatmsg.length===0) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount() {
    const from = this.props.match.params.user
    this.props.readMsg(from)
  }
  handleChange() {
    // socket.emit('communicate', this.state.text)
    // this.setState({text:''})
    const from = this.props.user._id 
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({
        text:''
    })
  }
  render() {
    const Item = List.Item
    const userid = this.props.match.params.user
    const users = this.props.chat.users
    const chatid = getChatId(userid, this.props.user._id)
    // 拿出需要展示的聊天
    const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
    return users[this.props.match.params.user] ? (
     <div id='chat-page'>
       <NavBar 
        mode='dark'
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.goBack()}
        style={{position:'fixed',top:0,zIndex:'100',width:'100%'}}
        >
         {users[this.props.match.params.user].name}
       </NavBar>
       <QueueAnim>
       {chatmsg.map(v=>{
         const avatar = require(`../img/${users[v.from].avatar}.png`)
         return v.from === userid ? 
         (<List key={v._id}>
             <Item
              thumb={avatar}
             > {v.content} </Item>
         </List>)
         :
         (<List key={v._id}>
             <Item extra={<img src={avatar} alt=''/>} 
             className='chat-me'> {v.content} </Item>
         </List>)
       })}
       </QueueAnim>
       <List style={{position: 'fixed', width: '100%', bottom: 0}}>
         <InputItem
          placeholder='请输入'
          value={this.state.text}
          onChange={(v)=>this.setState({text:v})}
          extra={<span onClick={()=>this.handleChange()}>发送</span>}
         ></InputItem>
       </List>
     </div>
    ) :null
  }
}

export default Chat