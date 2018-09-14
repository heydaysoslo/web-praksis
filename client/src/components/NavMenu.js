import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class NavMenu extends Component {
  render() {
    const { items } = this.props
    if (!items.length < 0) {
      return null
    }
    return (
      <nav className="NavMenu">
        <ul className="NavMenu__list">
          {items.map(p => {
            if (p.slug) {
              return (
                <li className="NavMenu__item">
                  <NavLink
                    className="NavMenu__link"
                    key={`Nav__item-${p.ID}`}
                    to={p.slug}
                    onClick={this.props.toggle}
                  >
                    {p.title}
                  </NavLink>
                </li>
              )
            } else {
              return (
                <li className="NavMenu__item">
                  <a
                    className="NavMenu__link"
                    key={`Nav__item-${p.ID}`}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.title}
                  </a>
                </li>
              )
            }
          })}
          <li className="NavMenu__item">
            <Link to={'/sok'} className="NavMenu__link">
              Søk
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}
