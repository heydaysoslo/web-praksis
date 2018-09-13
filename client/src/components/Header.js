import React, { Component, Fragment } from 'react'
import { getNavMenu } from '../utils/wp'
import { Link } from 'react-router-dom'
import Portal from './Portal'
import Toggle from './Toggle'
import SlideoutNav from './SlideoutNav'
import NavMenu from './NavMenu'

class Header extends Component {
  state = {
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

  render() {
    return (
      <header className="Header">
        <Link to={'/'} className="Header__logo">
          Praksis
        </Link>
        <NavMenu items={this.state.menuItems} />
        <Toggle>
          {({ on, toggle }) => (
            <Fragment>
              {on && (
                <Portal>
                  <SlideoutNav toggle={toggle}>
                    <NavMenu items={this.state.menuItems} />
                  </SlideoutNav>
                </Portal>
              )}
              <button onClick={toggle}>Meny</button>
            </Fragment>
          )}
        </Toggle>
      </header>
    )
  }
}

export default Header
