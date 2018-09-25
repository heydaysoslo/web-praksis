import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getTags } from '../utils/wp'

class TagCloud extends Component {
  state = {
    loading: true,
    tags: []
  }
  componentDidMount() {
    getTags().then(tags => {
      this.setState({ tags, loading: false })
    })
  }
  render() {
    const { loading, tags } = this.state
    if (loading) {
      return null
    }
    return (
      <div className="TagCloud">
        {this.props.children}
        <nav className="TagCloud__nav">
          <ul className="TagCloud__list">
            {tags &&
              tags.map(tag => {
                return (
                  <li key={`tag-${tag.id}`} className="TagCloud__item">
                    <Link
                      className="TagCloud__link"
                      key={'tag-' + tag.id}
                      to={tag.link}
                    >
                      {tag.name}
                    </Link>
                  </li>
                )
              })}
          </ul>
        </nav>
      </div>
    )
  }
}

export default TagCloud
