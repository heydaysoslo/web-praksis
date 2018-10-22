import React, { Component } from 'react'

class Mouse extends Component {
  state = {
    mouse: 0
  }
  componentDidMount() {
    const headerHeight = document.querySelector('.Header').offsetHeight
    window.addEventListener('mousemove', e => {
      this.setState({
        mouse: e.pageY - headerHeight
      })
    })
  }
  render() {
    return <div className="Cards__dot" style={{ top: this.state.mouse }} />
  }
}

export default Mouse
