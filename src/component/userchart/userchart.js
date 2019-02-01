import React from 'react'
import { WingBlank, Card } from 'antd-mobile'

class UserChart extends React.Component {
  render() {
    return (
      <div>
        <WingBlank>
          {this.props.userlist.map(v=>
            v.avatar ? <Card key={v._id}>
            <Card.Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={v.title}
            />
            <Card.Body>
              {v.company ? <div>公司:{v.company}</div> : null}
              {v.desc.split('\n').map(d=>
                <div key={d}>{d}</div>
              )}
              {v.money ? <div>薪水:{v.money}</div> : null}
            </Card.Body>
          </Card> : null
          )}
        </WingBlank>
      </div>
    )
  }
}

export default UserChart