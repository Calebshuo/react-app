export function createStore(reducer, enhance) {
  if (enhance) {
    return enhance(createStore)(reducer)
  }
  let state
  let arr = []
  function getState() {
    return state
  }
  function subscribe(func) {
    arr.push(func)
  }
  function dispatch(action) {
    state = reducer(state,action)
    arr.map(v=>v())
  }
  dispatch({type:'abc'})
  return { getState, subscribe, dispatch }
}

// 1、两个以上的中间件形成嵌套函数的关系，最外层中间件函数的next函数是下一个中间件函数。
// 2、如果action是[{type:'add'}, {type:'add'}]，则先进入thunk函数，判断不是typeof function进入addArr函数，判断是数组，对数组每一项进行dispatch，此时的store.dispatch已经被applyMiddleware函数修改，所以会形成递归调用，{type:'add'}成为action，继续进到thunk函数，然后进入addArr函数执行next（初始的store.dispatch函数体（function dispatch(action) {state = reducer(state,action)arr.map(v=>v())}）），这次不会再进入递归,因为一个传入的是函数体，另一个是对象中的属性，该属性对应的是一个函数(这个函数是回调函数！！！)，这个函数的返回值又是一个函数，但是这个函数已经改变了.
function compose(funcs) {
  if(funcs.length === 0) {
    return arg=>arg
  } else if(funcs.length === 1) {
    return funcs[0]
  } else {
    return funcs.reduce((ret,item)=>(args)=>ret(item(args)))
  }
}

export function applyMiddleware(...middlewares) {
  return (createStore)=>(reducer)=>{
    let store = createStore(reducer)
    let dispatch = store.dispatch
    let midApi = {
      dispatch: (...args)=>dispatch(...args), // 直接写dispatch就是原函数
      getState: store.getState
    }
    const middlewareChain = middlewares.map(v=>v(midApi))
    dispatch = compose(middlewareChain)(dispatch)
    // dispatch = middleware(midApi)(store.dispatch)
    // console.log(dispatch)
    return {
      ...store,
      dispatch
    }
  }
}

function bindActionCreator(func,dispatch) {
  return (...args)=>{
    dispatch(func(...args))  // 在这里判断thunk里面的action
  }
}

export function bindActionCreators(creaters,dispatch) {
  // let bound = {}
  // Object.keys(creaters).forEach(v=>{
  //     bound[v] = bindActionCreator(creaters[v],dispatch)

  // })
  // return bound
  return Object.keys(creaters).reduce((ret,item)=>{
    ret[item] = bindActionCreator(creaters[item],dispatch)
    return ret
  },{})
}
