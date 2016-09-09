import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import App from './src/scenes/App'
import { Provider } from 'react-redux'
import store from './src/store'
import { hookConsoleLog } from 'stacklogger'

class PHUL extends Component {
  constructor (props) {
    super(props)
    hookConsoleLog()
  }

  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('PHUL', () => PHUL)
