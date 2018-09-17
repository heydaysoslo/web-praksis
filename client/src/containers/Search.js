import React, { Component } from 'react'
import TagCloud from '../components/TagCloud'
import Post from '../components/Post'
import { search } from '../utils/wp'

const PostsEmpty = () => {
  return 'Ingen innlegg funnet'
}

export default class Search extends Component {
  state = {
    searchTerm: '',
    posts: []
  }

  handleSubmit = event => {
    search(this.state.searchTerm)
      .then(posts => {
        this.setState({ posts })
      })
      .catch(err => {
        this.setState({ posts: [] })
      })
    event.preventDefault()
  }

  handleChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const { posts } = this.state
    return (
      <article className="Search">
        {/* <header className="Search__header">
          <h1>Søk</h1>
        </header> */}
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
          <PostsEmpty />
        )}
      </article>
    )
  }
}
