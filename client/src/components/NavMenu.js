import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import uuid from 'uuid/v1'

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
                <li key={uuid()} className="NavMenu__item">
                  <NavLink
                    activeClassName="NavMenu__link--active"
                    className="NavMenu__link"
                    to={p.slug}
                    onClick={this.props.toggle}
                  >
                    {p.title}
                  </NavLink>
                </li>
              )
            } else {
              return (
                <li key={uuid()} className="NavMenu__item">
                  <a
                    className="NavMenu__link"
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
        </ul>
      </nav>
    )
  }
}
