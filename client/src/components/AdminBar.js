import React, { Component } from 'react'
import { loggedIn } from '../utils/wp'

export default class AdminBar extends Component {
  state = {
    user: false
  }

  componentDidMount = () => {
    loggedIn().then(user => {
      if (user && user.logged_in === true) {
        this.setState({ user })
      }
    })
  }

  render() {
    const { user } = this.state
    if (!user) {
      return null
    }
    return (
      <div className="AdminBar">Hello, {user.userdata.data.user_nicename}!</div>
    )
  }
}
