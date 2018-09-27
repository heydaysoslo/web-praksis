import React, { Component } from 'react'
import { getPostTerms } from '../utils/wp'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v1'
import cc from 'classcat'

export default class PostTerms extends Component {
  render() {
    const terms = getPostTerms(this.props.post, 'category')
    if (!terms) {
      return null
    }
    return (
      <ul
        className={cc({
          PostTerms: true,
          [this.props.className]: true
        })}
      >
        <li className="PostTerms__item PostTerms__item--title">
          <strong>Kategorier</strong>
        </li>
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
