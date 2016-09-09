import StartScene from '../scenes/Start'
import Workout from '../scenes/Workout'
import Settings from '../scenes/Settings'

const routes = {
  start: {
    initialRoute: true,
    title: 'StartScene',
    component: StartScene,
    workout: {
      title: 'Workout Example', // optional
      component: Workout
    }
  },
  settings: {
    title: 'Settings',
    component: Settings
  }
}

// wraps any route object from routes into a proxy that has additional functions defined, like key, path, ...
class Route {
  constructor (routeObj, key = '' , path) {
    path = path || key
    this.route = routeObj
    this.key = key
    this.path = path
  }

  get initialRoute () { return this.route.initialRoute }
  get title () { return this.route.title }
  get component () { return this.route.component }
  traverse (path) {
    let paths = path.split('/')
    let current = this.route
    for (var i = 0; i < paths.length; i++) {
      if (!current.hasOwnProperty(paths[i])) throw new Error(`Route::traverse: ${paths[i]} is not a child of `, current)
      current = current[paths[i]]
    }
    let childKey = paths.pop()
    let childPath = this.path.length === 0 ? path : `${this.path}/${path}`
    // console.log(`from ${this.path} for ${path} leads to ${childPath}`)
    return new Route(current, childKey, childPath)
  }

  get isChild () { return this.path.includes('/') }

  get parent () {
    // traverse up one level
    if (!this.isChild) return new Route(routes)
    else {
      let parentPath = this.path.slice(0, this.path.lastIndexOf('/'))
      console.log('Parent of ', this.path, ' is: ', parentPath)
      return new Route(routes).traverse(parentPath)
    }
  }

  // check if childRoute is a (multi-level) parent of this route
  isAncestorOf (childRoute) {
    if (childRoute.path.length < this.path.length) return false
    let childSubPath = childRoute.path.slice(0, this.path.length)
    return childSubPath === this.path
  }
}

export function getInitialRoute () {
  let routeKey = null
  Object.keys(routes).every(key => {
    if (routes[key].initialRoute) {
      routeKey = key
      return false // <=> break
    }
    return true
  })
  if (!routeKey) throw new Error('No initial route found')
  return new Route(routes[routeKey], routeKey)
}

const routesAsRoute = new Route(routes)
export default routesAsRoute
