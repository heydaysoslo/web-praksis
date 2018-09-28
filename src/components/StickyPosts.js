import React, { Component } from 'react'
import { getStickyPosts } from '../utils/wp'
import { Link } from 'react-router-dom'
import { getObjectLink } from '../utils/wp'
import uuid from 'uuid/v1'

export default class StickyPosts extends Component {
  state = {
    posts: []
  }

  componentDidMount = () => {
    getStickyPosts().then(posts => {
      this.setState({
        posts
      })
    })
  }

  render() {
    const { posts } = this.state
    if (!posts.length) {
      return null
    }
    return (
      <div className="StickyPosts container">
        <ul className="StickyPosts__list grid">
          {posts.map(post => {
            return (
              <li
                key={uuid('sticky')}
                className="StickyPosts__item grid__item grid__item--md-4"
              >
                <Link className="StickyPosts__link" to={getObjectLink(post)}>
                  <h3 className="StickyPosts__title">{post.title.rendered}</h3>
                  <span>Les mer</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
