
let target = {
  navigationMenuClick: 'NAVIGATION_MENU_CLICK',
  toolbarIconClick: 'TOOLBAR_ICON_CLICK'
}

// Proxies are not supported in react-native as they cannot be transpiled to ES5
// class ActionNameError extends Error {
//   constructor (m) {
//     super(m)
//     this.name = 'ActionNameError'
//   }
// }
// let handler = {
//   get: (target, key) => {
//     if (target.hasOwnProperty(key)) return target[key]
//     else throw new ActionNameError(`Fired a wrong actionname: ${key}. Available Actions: ${Object.keys(target)}`)
//   }
// }

// const proxy = new Proxy(target, handler)
// export default proxy

export default target
