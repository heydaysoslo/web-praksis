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
      <article className="Article Article--single container">
        <div className="Article__inner">
          <div className="Article__header">
            <h1 className="Article__title">Passordbeskyttet innlegg</h1>
          </div>
          <div className="Article__content">
            <div className="PostPassword">
              <form className="PostPassword__form" onSubmit={this.handleSubmit}>
                <label className="PostPassword__label" for="ppw-input">
                  Skriv inn passord
                </label>
                <input
                  className="PostPassword__input"
                  id="ppw-input"
                  onChange={this.handleChange}
                  type="text"
                />
                {this.state.pwmessage && (
                  <p className="PostPassword__message">
                    {this.state.pwmessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default PostPassword
