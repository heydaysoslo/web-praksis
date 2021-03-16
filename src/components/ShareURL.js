import React, { Component, createRef } from 'react'
import cc from 'classcat'

export default class ShareURL extends Component {
  input = createRef()

  state = {
    success: null,
  }

  handleCopy = (e) => {
    e.preventDefault()

    this.input.current.value = this.props.url
    this.input.current.select()
    document.execCommand('copy')

    this.setState({
      success: true,
    })

    this.successTimeout = setTimeout(() => {
      this.setState({
        success: null,
      })
    }, 1000)
  }

  componentWillUnmount = () => {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout)
    }
  }

  render() {
    const { url } = this.props
    const { isCopying, success } = this.state
    return (
      <div className="ShareURL">
        <form className="ShareURL__form">
          <input
            ref={this.input}
            className="BookHour__input"
            type="text"
            value={url}
            readOnly={true}
          />
          <button
            className={cc({
              ShareURL__button: true,
              button: true,
              'button--loading': isCopying,
            })}
            type="submit"
            onClick={this.handleCopy}
          >
            {success ? 'Kopiert!' : 'Kopier lenke'}
          </button>
        </form>
      </div>
    )
  }
}
