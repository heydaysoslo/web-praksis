import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class Header extends Component {
  state = {
    menuItems: []
  }

  componentDidMount = () => {
    fetch('http://praksis.test/api/menus/v1/menus/primary')
      .then(res => res.json())
      .then(res => {
        this.setState({
          menuItems: res.items
        })
      })
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
            </nav>
          )}
          {/* <pre>{JSON.stringify(this.state.menuItems, null, 2)}</pre> */}
        </header>
      </div>
    )
  }
}

export default Header
