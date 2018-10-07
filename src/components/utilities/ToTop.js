import React, { Component } from 'react'
import { ScrollToggle } from './'
import cc from 'classcat'
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

export default class ToTop extends Component {
  scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  render() {
    return (
      <ScrollToggle>
        {({ visible }) => {
          return (
            <button
              onClick={this.scrollToTop}
              className={cc({
                ToTop,
                'ToTop--visible': visible
              })}
            >
              Tilbake til topp
            </button>
          )
        }}
      </ScrollToggle>
    )
  }
}
