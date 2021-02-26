import React, { Component, createContext } from 'react'
import { getNavMenu, getPosts, getSettings, getPageById } from '../../utils/wp'
import mqlistener from '../../utils/mqlistener'

const SiteContext = createContext()

export class Provider extends Component {
  state = {
    showMenu: false,
    menuItems: [],
    secondaryItems: [],
    posts: [],
    postsPage: 1,
    loadingNext: false,
    allPagesLoaded: false,
    feedScrollPos: 0,
    settings: {
      bloginfo: null,
    },
    initialLoad: false,
    frontPage: null,
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
      if (settings.front_page_id) {
        getPageById(settings.front_page_id).then((frontPage) => {
          this.setState({ frontPage })
        })
      }
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
     * Get feed items
     */
    getPosts(this.state.postsPage).then((res) => {
      this.setState({
        posts: res,
        initialLoad: true,
      })
    })
  }

  toggleMenu = () => {
    this.setState(
      (prevState) => ({ showMenu: !prevState.showMenu }),
      () => this.noScroll()
    )
  }

  nextPage = () => {
    const nextPage = this.state.postsPage + 1
    this.setState({ loadingNext: true })
    getPosts(nextPage)
      .then((res) => {
        this.setState((prevState) => {
          return {
            posts: [...prevState.posts, ...res],
            postsPage: nextPage,
            loadingNext: false,
          }
        })
      })
      .catch((err) => {
        if (err && err.code && err.code === 'rest_post_invalid_page_number') {
          this.setState({
            allPagesLoaded: true,
          })
        }
      })
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
            nextPage: this.nextPage,
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
