import React from 'react'
import { List, InputItem } from 'antd-mobile'
import { getMsgList, recvMsg, sendMsg } from '../../redux/chat.redux'
import { connect } from 'react-redux'

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
    this.props.getMsgList()
    this.props.recvMsg() 
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
    // console.log(this.props)
    return (
     <div>
       {this.state.msg.map(v=>{
         return <p key={v}>{v}</p>
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
    )
  }
}

export default Chat