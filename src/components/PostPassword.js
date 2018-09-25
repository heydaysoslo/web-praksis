import React, { Component } from 'react'
// import Cookies from 'universal-cookie'
import { getProtectedObject } from '../utils/wp'
import Loading from './Loading'

class PostPassword extends Component {
  state = {
    isUnlocked: false,
    password: '',
    pwmessage: '',
    loading: true
  }

  componentDidMount = () => {
    const password = sessionStorage.getItem(
      'post_unlocked_' + this.props.postId
    )
    if (password) {
      this.setState(
        {
          password
        },
        this.getObject
      )
    } else {
      this.setState({
        loading: false
      })
    }
  }

  getObject = () => {
    getProtectedObject(
      this.props.postId,
      this.props.postType,
      this.state.password
    )
      .then(post => {
        // Save password in session so we don't need to ender password every time
        sessionStorage.setItem(
          'post_unlocked_' + this.props.postId,
          this.state.password
        )
        this.props.postUnlocked(post)
      })
      .catch(err => {
        console.log('error', err)
        if (err.message) {
          this.setState({
            pwmessage: err.message
          })
        }
      })
  }

  handleSubmit = event => {
    this.getObject()
    event.preventDefault()
  }

  handleChange = event => {
    this.setState({ password: event.target.value })
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Passordbeskyttet innlegg
            <br />
            <input onChange={this.handleChange} type="text" />
            {this.state.pwmessage && <p>{this.state.pwmessage}</p>}
          </label>
        </form>
      </div>
    )
  }
}

export default PostPassword
