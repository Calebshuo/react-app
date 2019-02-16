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

export function applyMiddleware(middleware) {
  return (createStore)=>(reducer)=>{
    let store = createStore(reducer)
    let dispatch = store.dispatch
    let midApi = {
      dispatch: (...args)=>dispatch(...args),
      getState: store.getState
    }
    dispatch = middleware(midApi)(store.dispatch)
    console.log(dispatch)
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
  let bound = {}
  Object.keys(creaters).forEach(v=>{
      bound[v] = bindActionCreator(creaters[v],dispatch)
  })
  return bound
}
