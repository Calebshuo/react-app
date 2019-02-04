import React from 'react'
import { List, InputItem } from 'antd-mobile'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text:'', msg:[]}
  }
  handleChange() {
    socket.emit('communicate', this.state.text);
    this.setState({text:''})
  }
  componentDidMount() {
    socket.on('servertalk', data=>{
      this.setState({msg:[...this.state.msg,data]})
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