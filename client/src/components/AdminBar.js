import React, { Component } from 'react'
import { loggedIn } from '../utils/wp'

export default class AdminBar extends Component {
  state = {
    data: false
  }

  componentDidMount = () => {
    loggedIn().then(data => {
      if (data && data.logged_in === true) {
        this.setState({ data })
      }
    })
  }

  render() {
    const { data } = this.state
    if (!data) {
      return null
    }
    return (
      <div className="AdminBar">
        <a target="_blank" rel="noopener" href={data.admin_url}>
          WordPress
        </a>
      </div>
    )
  }
}
