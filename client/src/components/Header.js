import React, { Component, Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getNavMenu } from '../utils/wp'
import Portal from './Portal'
import Toggle from './Toggle'
import SlideoutNav from './SlideoutNav'

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
      <div className="container">
        <header className="Header">
          <Link to={'/'} className="Header__logo">
            Praksis
          </Link>
          {this.state.menuItems.length > 0 && (
            <nav className="Header__nav Nav">
              {this.state.menuItems.map(p => {
                if (p.slug) {
                  return (
                    <NavLink
                      className="Nav__item"
                      key={`Nav__item-${p.ID}`}
                      to={p.slug}
                    >
                      {p.title}
                    </NavLink>
                  )
                } else {
                  return (
                    <a
                      key={`Nav__item-${p.ID}`}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.title}
                    </a>
                  )
                }
              })}
              <Link to={'/sok'} className="Nav__item">
                Søk
              </Link>
            </nav>
          )}
          {/* <pre>{JSON.stringify(this.state.menuItems, null, 2)}</pre> */}
          <Toggle>
            {({ on, toggle }) => (
              <Fragment>
                {on && (
                  <Portal>
                    <SlideoutNav toggle={toggle} />
                  </Portal>
                )}
                <button onClick={toggle}>Meny</button>
              </Fragment>
            )}
          </Toggle>
        </header>
      </div>
    )
  }
}

export default Header
