import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './custom-redux';

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
      this.store = this.context.store
      this.update = this.update.bind(this)
    }
    componentDidMount() {
      this.store.subscribe(this.update)
      this.update()
    }
    update() {
      // this.state = {  // 需要异步的修改数据，componentDidMount钩子是在页面渲染完后执行（react不能监听到直接修改state从而不刷新页面）
      //   props: {
      //     ...mapStateToProps(store.getState())
      //   }
      // }
      const dispatchProps = bindActionCreators(mapDispatchToProps,this.store.dispatch)
      this.setState({
        props: {
          ...mapStateToProps(this.store.getState()),
          ...this.props, // 传比如路由组件的match、history什么的
          ...dispatchProps
        }
      })
    }
    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}