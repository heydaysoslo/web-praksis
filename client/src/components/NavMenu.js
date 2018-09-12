import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class NavMenu extends Component {
  render() {
    const { items } = this.props
    if (!items.length < 0) {
      return null
    }
    return (
      <nav className="Header__nav Nav">
        {items.map(p => {
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
    )
  }
}
