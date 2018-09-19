import React, { Component } from 'react'

export default class SlideoutNav extends Component {
  componentDidMount = () => {}

  componentWillUnmount = () => {}

  render() {
    return (
      <section className="SlideoutNav">
        <div className="SlideoutNav__background" onClick={this.props.toggle} />
        <div className="SlideoutNav__content">
          <div className="SlideoutNav__menu">
            <header className="SlideoutNav__header">
              <button
                className="SlideoutNav__close-button"
                onClick={this.props.toggle}
              >
                Lukk
              </button>
            </header>
            <div className="SlideoutNav__body">{this.props.children}</div>
          </div>
        </div>
      </section>
    )
  }
}
