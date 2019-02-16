export default function arrayAdd({dispatch,getState}) {
  return (next)=>(action)=>{
    debugger
    if(Array.isArray(action)) {
      return action.forEach(v=>dispatch(v))
    } else {
      return next(action)
    }
  }
}