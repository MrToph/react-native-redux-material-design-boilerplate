import React, { Component } from 'react'
import { StyleSheet, Navigator, View } from 'react-native'
import Toolbar from '../components/Toolbar'
import { getInitialRoute } from '../routes'
import { connect } from 'react-redux'

class MyNavigator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigator: null
    }
    this.renderScene = this.renderScene.bind(this)
    this.refCallback = this.refCallback.bind(this)
    this.configureScene = this.configureScene.bind(this)
  }

  render () {
    return (
      <Navigator
        initialRoute={getInitialRoute()}
        navigationBar={<Toolbar />}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        ref={this.refCallback} />
    )
  }

  configureScene (route, routeStack) {
    // console.log(route, routeStack)
    return Navigator.SceneConfigs.FadeAndroid
  }

  renderScene (route, navigator) {
    // console.log(route)
    if (route.component) {
      return (
        <View style={styles.scene} showsVerticalScrollIndicator={false}>
          <route.component title={route.title} path={route.path} {...route.props} />
        </View>
      )
    }
  }

  // called once AFTER the first renderScene
  refCallback (navigator) {
    console.log()
    if (!this.state.navigator) {
      this.setState({navigator})
    }
  }

  // called before shouldComponentUpdate
  // We have an activeWorkout route and an activeRoute
  // We want the activeWorkout to never be unmounted, because we might run timers there etc.
  // So we always keep activeWorkout as the first element in the routeStack
  // For new routes:  if they are not in the route stack they get pushed onto it
  //                  if they are in the route stack we pop to them to save on space
  // If activeWorkout gets updated, we clear the routeStack and make it the first element
  componentWillReceiveProps (nextProps) {
    if (nextProps.activeWorkout !== this.props.activeWorkout) {
      if (nextProps.activeWorkout.path !== nextProps.route.path) throw new Error('Changed activeWorkout but not activeRoute')
      this.state.navigator.resetTo(nextProps.activeWorkout)
      console.log(`New activeWorkout set to ${nextProps.activeWorkout.key}. Resetting routes`)
    } else if (nextProps.route.path !== this.props.route.path) {
      let currentRoutes = this.state.navigator.getCurrentRoutes()
      let nextRouteIndex = currentRoutes.findIndex(x => x.path === nextProps.route.path)
      console.log(`found ${nextProps.route.path} at ${nextRouteIndex}`, currentRoutes)
      // did we go 'back', i.e., up some level?
      if (nextRouteIndex >= 0) {
        this.state.navigator.popN(currentRoutes.length - 1 - nextRouteIndex)
      } else {
        this.state.navigator.push(nextProps.route) // replace provides no transition
      }
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    // console.log(nextProps.route.path !== this.props.route.path)
    return nextProps.route.path !== this.props.route.path
  }

}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 56
  }
})

const mapStateToProps = state => {
  return {
    route: state.activeRoute,
    activeWorkout: state.activeWorkout
  }
}

export default connect(mapStateToProps)(MyNavigator)
