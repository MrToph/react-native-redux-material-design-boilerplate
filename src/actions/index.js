import ActionNames from '../actions/ActionNames'

export function createNavigationMenuClick (path) {
  return {
    type: ActionNames.navigationMenuClick,
    payload: path
  }
}

export function createToolbarIconClick () {
  return {
    type: ActionNames.toolbarIconClick
  }
}
