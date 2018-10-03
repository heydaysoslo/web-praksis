import React, { Component, createContext } from 'react'
import { getNavMenu, getPosts } from '../../utils/wp'
const MyContext = createContext()

export class Provider extends Component {
  state = {
    showMenu: false,
    menuItems: [],
    posts: [],
    postsPage: 1,
    loadingNext: false,
    allPagesLoaded: false
  }

  componentDidMount = () => {
    getNavMenu('primary')
      .then(res => {
        this.setState({
          menuItems: res.items
        })
      })
      .catch(err => console.log(err))

    getPosts(this.state.postsPage).then(res => {
      this.setState({
        posts: res
      })
    })
  }

  toggleMenu = () => {
    this.setState(
      prevState => ({ showMenu: !prevState.showMenu }),
      () => this.noScroll()
    )
  }

  nextPage = () => {
    const nextPage = this.state.postsPage + 1
    this.setState({ loadingNext: true })
    getPosts(nextPage)
      .then(res => {
        this.setState(prevState => {
          return {
            posts: [...prevState.posts, ...res],
            postsPage: nextPage,
            loadingNext: false
          }
        })
      })
      .catch(err => {
        if (err && err.code && err.code === 'rest_post_invalid_page_number') {
          this.setState({
            allPagesLoaded: true
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
      <MyContext.Provider
        value={{
          state: this.state,
          actions: {
            toggleMenu: this.toggleMenu,
            nextPage: this.nextPage
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    )
  }
}
export const Consumer = MyContext.Consumer
