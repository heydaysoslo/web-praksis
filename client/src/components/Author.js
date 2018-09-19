import React, { Component } from 'react'
import Lazyload from './Lazyload'

export default class Author extends Component {
  render() {
    const { avatar, bio, name } = this.props.author
    return (
      <div className="Author">
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
