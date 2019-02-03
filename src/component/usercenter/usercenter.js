import React from 'react'
import { connect } from 'react-redux'
import { List, Result, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'

@connect (
  state => state.user
)
class UserCenter extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    const alert = Modal.alert;
    alert('logout', 'Are you sure???', [
      { text: 'Cancel', style: 'default' },
      { text: 'yep!!', onPress: () => {
        browserCookie.erase('userid')
        this.props.history.push('/login')
      } },
    ]);
  }
  render() {
    // console.log(this.props) // updata函数前后两次打印props
    const Item = List.Item
    const Brief = Item.Brief
    return this.props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} alt="" style={{width:50}} />}
          title={this.props.user}
          message={this.props.company ? this.props.company : null}
        ></Result>
        <List
          renderHeader={() => '简介'}
        >
          <Item>
            {this.props.title}
            {this.props.desc.split('\n').map((mes)=><Brief key={mes}>
              {mes}
            </Brief>)}
            {this.props.money ? <Brief>薪资{this.props.money}</Brief> :null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div> 
    ) :null
  }
}

export default UserCenter