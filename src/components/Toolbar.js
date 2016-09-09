import React, { Component } from 'react'
import { Toolbar as MaterialToolbar } from 'react-native-material-design'
import { connect } from 'react-redux'
import { createToolbarIconClick } from '../actions'

class Toolbar extends Component {
  render () {
    return (
      <MaterialToolbar
        title={this.props.title}
        primary='googleRed'
        icon={this.props.isChild ? 'keyboard-backspace' : 'menu'}
        onIconPress={this.props.dispatchToolbarIconClick}
        actions={[]}
        rightIconStyle={{ margin: 10 }} />
    )
  }
}

const mapStateToProps = state => {
  return {
    title: state.activeRoute.title,
    isChild: state.activeRoute.isChild
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchToolbarIconClick: () => dispatch(createToolbarIconClick())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
