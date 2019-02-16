export default function thunk({dispatch,getState}) {
  return (next)=>(action)=>{
    debugger
    if(typeof action === 'function') {
      return action(dispatch,getState)
    } else {
      return next(action)
    }
  }
}