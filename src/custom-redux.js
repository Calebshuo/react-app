export function createStore(reducer) {
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

function bindActionCreator(func,dispatch) {
  return (...args)=>{
    dispatch(func(...args))
  }
}

export function bindActionCreators(creaters,dispatch) {
  let bound = {}
  Object.keys(creaters).forEach(v=>{
      bound[v] = bindActionCreator(creaters[v],dispatch)
  })
  return bound
}
