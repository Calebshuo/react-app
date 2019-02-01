import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
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