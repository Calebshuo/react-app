import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect (
  state => state.chat
)
class NavLink extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render() {
    const navList = this.props.data.filter(v=>!v.hide)
    return (
      <div>
        <TabBar>
          {
            navList.map(v=>(
              <TabBar.Item
                badge={v.icon==='msg' ? this.props.unread : 0}
                key={v.path}
                title={v.text}
                icon={{uri: require(`./img/${v.icon}.png`)}}
                onPress={()=>this.props.history.push(v.path)}
              >

              </TabBar.Item>
            )
            )
          }
        </TabBar>
      </div>
    )
  }
}

export default NavLink