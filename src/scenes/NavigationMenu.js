import React, { Component } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { Drawer, Divider, Avatar } from 'react-native-material-design'
import routes from '../routes'
import { connect } from 'react-redux'
import { createNavigationMenuClick } from '../actions'

class NavigationMenu extends Component {
  render () {
    return (
      <Drawer theme='light'>
        <Drawer.Header image={<Image source={require('../../img/nav.jpg')} />}>
          <View style={styles.header}>
            <Avatar size={80} image={<Image source={{ uri: 'http://facebook.github.io/react-native/img/opengraph.png?2' }} />} />
            <Text>
              React Native Material Design
            </Text>
          </View>
        </Drawer.Header>
        {this.renderDrawerSection(routes.traverse('start'), 'home')}
        {this.renderDrawerSection(routes.traverse('start/workout'), 'home')}
        <Divider style={{ marginTop: 8 }} />
        {this.renderDrawerSection(routes.traverse('settings'), 'invert-colors', {label: '24'})}
      </Drawer>
    )
  }

  renderDrawerSection (route, iconName, otherProps) {
    let onPress = () => this.drawerItemClick(route.path)
    let active = this.props.routeTitle === route.title
    return (
      <Drawer.Section items={[{ icon: iconName, value: route.title, active, onPress, onLongPress: onPress, ...otherProps}]} />
    )
  }

  drawerItemClick (path) {
    // dispatch path change action
    this.props.dispatchNavigationMenuClick(path)
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16
  },
  text: {
    marginTop: 20
  }
})

const mapStateToProps = state => {
  return {
    routeTitle: state.activeRoute.title
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchNavigationMenuClick: path => dispatch(createNavigationMenuClick(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu)
