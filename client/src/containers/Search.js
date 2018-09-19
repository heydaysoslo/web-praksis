import React, { Component } from 'react'
import TagCloud from '../components/TagCloud'
import Post from '../components/Post'
import { search } from '../utils/wp'

const cleanSearch = str => {
  return str.replace(/[^a-zA-Z0-9\-_ ]/g, '')
}

export default class Search extends Component {
  state = {
    searchTerm: '',
    posts: []
  }

  doSearch = () => {
    const searchTerm = cleanSearch(this.state.searchTerm)
    search(searchTerm)
      .then(posts => {
        this.setState({ posts })
      })
      .catch(err => {
        this.setState({ posts: [] })
      })
  }

  handleSubmit = event => {
    this.doSearch()
    event.preventDefault()
  }

  handleChange = event => {
    const query = event.target.value
    this.setState({ searchTerm: query }, () => {
      window.history.replaceState({ query }, '', '/sok/' + query)
    })
  }

  componentDidMount = () => {
    // Search on initial load based on query
    if (this.props.match.params && this.props.match.params.query) {
      this.setState(
        {
          searchTerm: this.props.match.params.query
        },
        () => {
          this.doSearch()
        }
      )
    }
  }

  render() {
    const { posts } = this.state
    return (
      <article className="Search">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              placeholder="Skriv her"
              onChange={this.handleChange}
              type="text"
              value={this.state.searchTerm}
            />
          </label>
        </form>
        <TagCloud>
          <p>… eller let i tags</p>
        </TagCloud>
        {posts.length ? (
          posts.map(p => <Post key={p.id} post={p} />)
        ) : (
          <div>
            Ingen innlegg funnet for <strong>{this.state.searchTerm}</strong>
          </div>
        )}
      </article>
    )
  }
}
