import Actions from '../actions/ActionNames'
import routes, { getInitialRoute } from '../routes'
const startState = {
  activeRoute: getInitialRoute(),
  activeWorkout: null,
  drawer: {open: false}
}

const reducer = (state = startState , action) => {
  if (action.type === Actions.navigationMenuClick) {
    let activeRoute = routes.traverse(action.payload)
    // need to chagne activeWorkout?
    let activeWorkout = activeWorkoutChange(state, activeRoute)
    let newState = {
      ...state, activeRoute, activeWorkout, drawer: {open: false}
    }
    return newState
  } else if (action.type === Actions.toolbarIconClick) {
    // if active route is a child route, we want to go up one level, otherwise we just open the drawer
    let activeRoute = state.activeRoute.isChild ? state.activeRoute.parent : state.activeRoute
    let drawer = {open: !state.activeRoute.isChild}
    let newState = {...state, activeRoute, drawer}
    return newState
  }
  return state
}

export default reducer

// TODO: add real check, f.i., if someone entered a rep in a workout
function activeWorkoutChange (state, activeRoute) {
  console.log(activeRoute.key)
  if (activeRoute.key === 'workout' && (!state.activeWorkout || state.activeWorkout.key !== 'workout')) return routes.traverse(activeRoute.path)
  else return state.activeWorkout
}
