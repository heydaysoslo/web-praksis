import React, { Component } from 'react'
import TagCloud from '../components/TagCloud'
import Post from '../components/Post'
import { search } from '../utils/wp'

export default class SearchView extends Component {
  state = {
    searchTerm: '',
    posts: [],
  }

  handleSubmit = (event) => {
    search(this.state.searchTerm)
      .then((posts) => {
        this.setState({ posts })
      })
      .catch((err) => {
        this.setState({ posts: [] })
      })
    event.preventDefault()
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  onEscClick = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      this.props.toggle()
      e.preventDefault()
    }
  }

  componentDidMount = () => {
    window.addEventListener('keyup', this.onEscClick, true)
  }

  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.onEscClick)
  }

  render() {
    const { posts } = this.state
    return (
      <div className="SearchView">
        <header className="SearchView__header">
          <h1>Søk</h1>
          <button onClick={this.props.toggle}>
            <div className="Close">
              <span />
              <span />
            </div>
          </button>
        </header>
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
        {posts && posts.map((p) => <Post key={p.id} post={p} />)}
      </div>
    )
  }
}
