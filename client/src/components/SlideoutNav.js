import React, { Component } from 'react'

export default class SlideoutNav extends Component {
  componentDidMount = () => {
    console.log('mounted')
  }

  componentWillUnmount = () => {
    console.log('unmounting')
  }

  render() {
    return (
      <div className="SlideoutNav">
        <div className="SlideoutNav__background" onClick={this.props.toggle} />
        <div className="SlideoutNav__menu">{this.props.children}</div>
      </div>
    )
  }
}
