import React from 'react'
import PropTypes from 'prop-types'

export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {store:this.store}
  }
  constructor(props, context){
    super(props, context)
    this.store = this.props.store
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export const connect = (mapStateToProps=state=>state, mapDispatchToProps={})=>(WrapComponent)=>{
  return class New extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props,context)
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      this.update()
    }
    update() {
      const { store } = this.context
      // this.state = {
      //   props: {
      //     ...mapStateToProps(store.getState())
      //   }
      // }
      this.setState({
        props: {
          ...mapStateToProps(store.getState()),
          ...this.props // 传比如路由组件的match、history什么的
        }
      })
    }
    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}