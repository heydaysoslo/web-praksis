import React, { Component } from 'react'
import { getPostTags } from '../utils/wp'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v1'
import cc from 'classcat'

export default class PostTags extends Component {
  render() {
    const terms = getPostTags(this.props.post)
    if (!terms.length) {
      return null
    }
    return (
      <div
        className={cc({
          PostTags: true,
          [this.props.className]: true
        })}
      >
        <ul className="PostTags__list">
          <li className="PostTags__item PostTags__item--title">
            <strong>Tags</strong>
          </li>
          {terms.map(term => {
            return (
              <li className="PostTags__item" key={uuid()}>
                <Link className="PostTags__link" to={term.link}>
                  {term.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
