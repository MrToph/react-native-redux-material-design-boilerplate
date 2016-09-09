import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class StartScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    return (
      <View>
        <Text>
          Hi! My name is {this.props.title}.
        </Text>
      </View>
    )
  }
}
