import React, { Component } from 'react'
import { DrawerLayoutAndroid } from 'react-native'
import { connect } from 'react-redux'
import NavigationMenu from '../scenes/NavigationMenu'
import MyNavigator from '../components/MyNavigator'

class App extends Component {
  constructor (props) {
    super(props)
    this.refCallback = this.refCallback.bind(this)
    this.state = {
      drawerLayout: null
    }
  }
  render () {
    const navigationMenu = React.createElement(NavigationMenu)
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationMenu}
        ref={this.refCallback}>
        <MyNavigator />
      </DrawerLayoutAndroid>

    )
  }

  refCallback (drawerLayout) {
    if (!this.state.drawerLayout) {
      this.setState({drawerLayout})
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.open) this.state.drawerLayout.openDrawer()
    else this.state.drawerLayout.closeDrawer()
  }
}

const mapStateToProps = state => {
  return {
    open: state.drawer.open
  }
}

export default connect(mapStateToProps)(App)
