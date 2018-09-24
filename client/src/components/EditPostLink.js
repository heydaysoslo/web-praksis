import React, { Component } from 'react'
import { loggedIn } from '../utils/wp'

export default class EditPostLink extends Component {
  state = {
    loggedIn: false
  }
  componentDidMount = () => {
    loggedIn()
      .then(res => {
        if (res.logged_in) {
          this.setState({
            loggedIn: true
          })
        }
      })
      .catch()
  }

  render() {
    const { loggedIn } = this.state
    const { edit_post_link } = this.props.post
    if (!loggedIn || !edit_post_link) {
      return null
    }
    return (
      <a
        target="_blank"
        rel="noopener"
        className="edit-post-link"
        href={edit_post_link}
      >
        Rediger
      </a>
    )
  }
}
