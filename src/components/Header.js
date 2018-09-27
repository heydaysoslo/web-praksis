import React, { Component, Fragment } from 'react'
import { getNavMenu } from '../utils/wp'
import { Link } from 'react-router-dom'
import Portal from './Portal'
import Toggle from './Toggle'
import SlideoutNav from './SlideoutNav'
import NavMenu from './NavMenu'
import AdminBar from '../components/AdminBar'
// import SearchView from './SearchView'

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
      <header className="App__header Header">
        <AdminBar />
        <div className="Header__content container">
          <Link to={'/'} className="Header__logo">
            Praksis
          </Link>
          <div className="Header__nav Header__nav--right">
            <Toggle>
              {({ on, toggle }) => (
                <Fragment>
                  {on && (
                    <Portal>
                      <SlideoutNav toggle={toggle}>
                        <NavMenu toggle={toggle} items={this.state.menuItems} />
                      </SlideoutNav>
                    </Portal>
                  )}
                  <button onClick={toggle}>Meny</button>
                </Fragment>
              )}
            </Toggle>
            <Link to="/sok">Søk</Link>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
