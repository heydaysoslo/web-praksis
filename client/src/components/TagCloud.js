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
      <nav>
        {tags &&
          tags.map(tag => {
            return (
              <Link key={'tag-' + tag.id} to={tag.link}>
                {tag.name}
              </Link>
            )
          })}
      </nav>
    )
  }
}

export default TagCloud
