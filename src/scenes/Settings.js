import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { createNavigationMenuClick } from '../actions'
import { connect } from 'react-redux'

class Settings extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    return (
      <View>
        <Text>
          These are the settings! My name is
          {this.props.title}.
        </Text>
        <TouchableHighlight onPress={() => this.onPress()}>
          <Text>
            Go to Start/Child from Settings
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  onPress () {
    this.props.dispatchNavigationMenuClick('start/example')
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchNavigationMenuClick: path => dispatch(createNavigationMenuClick(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
