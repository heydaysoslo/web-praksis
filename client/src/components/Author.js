import React, { Component } from 'react'
import Lazyload from './Lazyload'
import cc from 'classcat'

export default class Author extends Component {
  render() {
    const { avatar, bio, name } = this.props.author
    return (
      <div
        className={cc({
          Author: true,
          [this.props.className]: true
        })}
      >
        <div className="Author__media">
          <Lazyload sizes={avatar} alt="Avatar" />
        </div>
        <div className="Author__content">
          <h4 className="Author__title">{name}</h4>
          {bio && <p className="Author__body">{bio}</p>}
        </div>
      </div>
    )
  }
}
