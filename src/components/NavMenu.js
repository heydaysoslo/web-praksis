import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cc from "classcat";
import { v1 as uuid } from "uuid";

export default class NavMenu extends Component {
  render() {
    const { items } = this.props;
    if (!items.length < 0) {
      return null;
    }
    return (
      <nav
        className={cc({
          NavMenu: true,
          "NavMenu--large": !this.props.small,
        })}
      >
        <ul className="NavMenu__list">
          {items.map((p) => {
            if (p.url.indexOf("://") === -1) {
              return (
                <li key={uuid()} className="NavMenu__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "NavMenu__link--active" : "NavMenu__link"
                    }
                    to={p.url}
                    onClick={this.props.toggle}
                    exact
                  >
                    {p.title}
                  </NavLink>
                </li>
              );
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
              );
            }
          })}
        </ul>
      </nav>
    );
  }
}
