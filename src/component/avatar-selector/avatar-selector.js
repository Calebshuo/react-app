import React from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired // 父组件必须传入selectAvatar，并且是函数
  }
  constructor (props) {
    super(props)
    this.state = {} 
  }
  render () {
    const avatarList = ['boy', 'girl', 'man' ,'woman', 'chick' ,'crab' ,'bull' ,'hedgehog', 'hippopo' ,'koala', 'lemur', 'pig', 'tiger', 'whale', 'zebra'].map(v => ({
      icon: require(`../img/${v}.png`),
      text: v
    }))

    const gridHeader = this.state.text
      ? (<div>
          <span>已选择头像：</span>
          <span>{this.state.text}</span>
        </div>)
      : (<div>
          请选择头像
        </div>)

    return (
      <div>
        <List
          renderHeader={gridHeader}>
          <Grid
            onClick={el => {
              this.setState(el)
              this.props.selectAvatar(el.text)
            }}
            columnNum={5}
            data={avatarList}/>
        </List>
      </div>
    )
  }
}

export default AvatarSelector
