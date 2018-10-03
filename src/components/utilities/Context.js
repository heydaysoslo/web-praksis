import React, { Component, createContext } from 'react'
import { getNavMenu } from '../../utils/wp'
const MyContext = createContext()

export class Provider extends Component {
  state = {
    showMenu: false,
    menuItems: []
  }

  componentDidMount = () => {
    getNavMenu('primary')
      .then(res => {
        this.setState({
          menuItems: res.items
        })
      })
      .catch(err => console.log(err))
  }

  toggleMenu = () => {
    this.setState(
      prevState => ({ showMenu: !prevState.showMenu }),
      () => this.noScroll()
    )
  }

  noScroll = () => {
    document.querySelector('html').style.cssText = this.state.showMenu
      ? 'overflow: hidden;'
      : ''
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          actions: {
            toggleMenu: this.toggleMenu
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    )
  }
}
export const Consumer = MyContext.Consumer
