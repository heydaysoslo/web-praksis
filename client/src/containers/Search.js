import React, { Component } from 'react'
import TagCloud from '../components/TagCloud'
import Post from '../components/Post'
import { search } from '../utils/wp'

const cleanSearch = str => {
  return str.replace(/[^a-zA-Z0-9\-_+ ]/g, '')
}

export default class Search extends Component {
  state = {
    inputValue: '',
    posts: [],
    searchTerm: '',
    searching: false
  }

  doSearch = () => {
    const searchTerm = cleanSearch(this.state.inputValue)
    this.setState({ searching: true })
    search(searchTerm)
      .then(posts => {
        this.setState({
          posts,
          searchTerm: this.state.inputValue,
          searching: false
        })
      })
      .catch(err => {
        this.setState({
          posts: [],
          searchTerm: this.state.inputValue,
          searching: false
        })
      })
  }

  handleSubmit = event => {
    if (this.autoQueryTimer) {
      clearTimeout(this.autoQueryTimer)
    }

    this.doSearch()

    event.preventDefault()
  }

  handleChange = event => {
    const query = event.target.value

    this.setState({ inputValue: query }, () => {
      window.history.replaceState({ query }, '', '/sok/' + query)
    })

    if (this.autoQueryTimer) {
      clearTimeout(this.autoQueryTimer)
    }
    this.autoQueryTimer = setTimeout(() => {
      this.doSearch()
    }, 500)
  }

  componentDidMount = () => {
    // Search on initial load based on query
    if (this.props.match.params && this.props.match.params.query) {
      this.setState(
        {
          inputValue: this.props.match.params.query
        },
        () => {
          this.doSearch()
        }
      )
    }
  }

  render() {
    const { posts, searching, searchTerm, inputValue } = this.state
    return (
      <article className="Search container">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              placeholder="Skriv her"
              onChange={this.handleChange}
              type="text"
              value={inputValue}
            />
          </label>
        </form>
        <TagCloud>
          <p>… eller let i tags</p>
        </TagCloud>
        {searching && <div>Vi leter og graver…</div>}
        {posts.length
          ? posts.map(p => <Post key={p.id} post={p} />)
          : searchTerm && (
              <div>
                Ingen innlegg funnet for <strong>{searchTerm}</strong>
              </div>
            )}
      </article>
    )
  }
}
