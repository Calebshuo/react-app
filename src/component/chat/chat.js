import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { getMsgList, recvMsg, sendMsg } from '../../redux/chat.redux'
import { connect } from 'react-redux'
import { getChatId } from '../../util'

@connect (
  state=>state,
  { getMsgList, recvMsg, sendMsg }
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
    if (this.props.chat.chatmsg.length==0) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
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
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
    // console.log(this.props)
    return users[this.props.match.params.user] ? (
     <div id='chat-page'>
       <NavBar 
        mode='dark'
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.goBack()}
        >
         {users[this.props.match.params.user].name}
       </NavBar>
       {chatmsg.map(v=>{
         const avatar = require(`../img/${users[v.from].avatar}.png`)
         return v.from == userid ? 
         (<List key={v._id}>
             <Item
              thumb={avatar}
             > {v.content} </Item>
         </List>)
         :
         (<List key={v._id}>
             <Item extra={<img src={avatar}/>} 
             className='chat-me'> {v.content} </Item>
         </List>)
       })}
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