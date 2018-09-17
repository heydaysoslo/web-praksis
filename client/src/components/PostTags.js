import React, { Component } from 'react'
import { getPostTags } from '../utils/wp'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v1'

export default class PostTags extends Component {
  render() {
    const terms = getPostTags(this.props.post)
    if (!terms) {
      return null
    }
    return (
      <div className="PostTags">
        <span>Tagget med</span>
        <ul className="PostTags__list">
          {terms &&
            terms.map(term => {
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
