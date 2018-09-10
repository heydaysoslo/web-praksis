import React, { Component } from 'react'
import TagCloud from '../components/TagCloud'

class Search extends Component {
  state = {
    searchTerm: ''
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  handleChange = event => {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    return (
      <article>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              placeholder="Skriv her"
              onChange={this.handleChange}
              type="text"
            />
          </label>
        </form>
        <p>… eller let i tags</p>
        <TagCloud />
      </article>
    )
  }
}

export default Search
