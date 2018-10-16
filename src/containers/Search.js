import React, { Component, Fragment, createRef } from 'react'
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

  input = createRef()

  doSearch = () => {
    const searchTerm = cleanSearch(this.state.inputValue)
    if (!searchTerm) {
      this.setState({
        searching: false,
        searchTerm: '',
        posts: [],
        inputValue: ''
      })
      window.history.replaceState({}, '', '/sok/')
    } else {
      this.setState({ searching: true })
      search(searchTerm)
        .then(posts => {
          this.setState(
            {
              posts,
              searchTerm: this.state.inputValue,
              searching: false
            },
            () => {
              // Add url parameter for successful search to make it possible to share results
              window.history.replaceState(
                { searchTerm },
                '',
                '/sok/' + searchTerm
              )
            }
          )
        })
        .catch(err => {
          console.log('err', err)
          this.setState({
            posts: [],
            searchTerm: this.state.inputValue,
            searching: false
          })
          window.history.replaceState({}, '', '/sok/')
        })
    }
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

    // this.setState({ inputValue: query }, () => {
    //   window.history.replaceState({ query }, '', '/sok/' + query)
    // })
    this.setState({ inputValue: query })

    if (this.autoQueryTimer) {
      clearTimeout(this.autoQueryTimer)
    }
    this.autoQueryTimer = setTimeout(() => {
      this.doSearch()
    }, 500)
  }

  componentWillUnmount = () => {
    if (this.inputFocusTimer) {
      clearTimeout(this.inputFocusTimer)
    }
  }

  componentDidMount = () => {
    this.inputFocusTimer = setTimeout(() => {
      this.input.current.focus()
    }, 300)

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

  clearSearch = () => {
    this.setState(
      {
        inputValue: ''
      },
      () => {
        this.doSearch()
      }
    )
  }

  render() {
    const { posts, searching, searchTerm, inputValue } = this.state
    return (
      <article className="Search container">
        <form className="Search__form" onSubmit={this.handleSubmit}>
          <label>
            <input
              ref={this.input}
              className="Search__input"
              placeholder="Skriv her"
              onChange={this.handleChange}
              type="text"
              value={inputValue}
            />
          </label>
          {inputValue && (
            <button className="Search__clear" onClick={this.clearSearch}>
              &times;
            </button>
          )}
        </form>
        {searching && <div className="Search__status">Et øyeblikk…</div>}
        {posts.length
          ? posts.map(p => <Post key={p.id} post={p} />)
          : searchTerm && (
              <div className="Search__status">
                Ingen innlegg funnet for <strong>{searchTerm}</strong>
              </div>
            )}
        {!searching &&
          !posts.length && (
            <Fragment>
              <TagCloud className="Search__tags" />
            </Fragment>
          )}
      </article>
    )
  }
}
