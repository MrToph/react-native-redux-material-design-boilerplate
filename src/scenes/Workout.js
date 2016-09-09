import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class WorkoutScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    return (
      <View>
        <Text>
          Workout Scene! Title:
          {this.props.title}.
        </Text>
      </View>
    )
  }

  componentWillUnmount () {
    console.log('WorkoutScene unmounted')
  }
}
