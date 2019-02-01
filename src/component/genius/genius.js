import React from 'react'
import { getUserList } from '../../redux/userlist.redux'
import { connect } from 'react-redux'
import UserChart from '../userchart/userchart'

@connect(
  state=>state.chatuser,
  { getUserList }
)
class Genius extends React.Component {
  componentWillMount() {
    this.props.getUserList('boss')
  }
  render() {
    return <UserChart userlist={this.props.userlist}></UserChart>
  }
}

export default Genius