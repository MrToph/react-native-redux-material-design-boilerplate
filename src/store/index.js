import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import reducers from '../reducers'
import devSettings from '../utils/devSettings'

var store
if (devSettings.log) {
  let middleWare = applyMiddleware(logger())
  store = createStore(reducers, undefined, middleWare)
} else {
  store = createStore(reducers)
}

export default store
