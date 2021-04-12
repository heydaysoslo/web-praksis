import React, { Component, createContext } from 'react'
import { getCategories, getNavMenu, getSettings } from '../../utils/wp'
import mqlistener from '../../utils/mqlistener'

const SiteContext = createContext()

export class Provider extends Component {
  state = {
    showMenu: false,
    menuItems: [],
    secondaryItems: [],
    settings: {
      bloginfo: null,
    },
    initialLoad: false,
    categories: [],
    mq: 'sm',
  }

  componentDidMount = () => {
    mqlistener((mq) => {
      this.setState({ mq })
    })

    /**
     * Get main settings
     */
    getSettings().then((settings) => {
      this.setState({
        settings,
      })
    })

    /**
     * Get navigation
     */
    Promise.all([getNavMenu('primary'), getNavMenu('secondary')])
      .then((res) => {
        this.setState({
          menuItems: res[0].items,
          secondaryItems: res[1].items,
        })
      })
      .catch((err) => console.log(err))

    /**
     * Get categories
     */
    getCategories().then((res) => {
      this.setState({
        categories: res,
      })
    })
  }

  toggleMenu = () => {
    this.setState(
      (prevState) => ({ showMenu: !prevState.showMenu }),
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
      <SiteContext.Provider
        value={{
          state: this.state,
          actions: {
            toggleMenu: this.toggleMenu,
          },
        }}
      >
        {this.props.children}
      </SiteContext.Provider>
    )
  }
}

export const Consumer = SiteContext.Consumer

export default SiteContext
