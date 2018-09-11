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
        <div className="SlideoutNav__menu">
          <ul>
            <li>Nav item</li>
            <li>Nav item</li>
            <li>Nav item</li>
            <li>Nav item</li>
            <li>Nav item</li>
          </ul>
        </div>
      </div>
    )
  }
}
