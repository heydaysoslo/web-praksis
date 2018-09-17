import React, { Component } from 'react'
import { getPostTerms } from '../utils/wp'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v1'

export default class PostTerms extends Component {
  render() {
    const terms = getPostTerms(this.props.post)
    if (!terms) {
      return null
    }
    return (
      <ul className="PostTerms">
        {terms &&
          terms.map(term => {
            return (
              <li className="PostTerms__item" key={uuid()}>
                <Link className="PostTerms__link" to={term.link}>
                  {term.name}
                </Link>
              </li>
            )
          })}
      </ul>
    )
  }
}
