import React, { Component } from 'react'
import { getProfileById } from '../utils/wp'
import cc from 'classcat'
import { acfImageToSrcArray, srcArrayToSrcset } from '../utils/lazysizes'
import renderHTML from 'react-render-html'

export default class Author extends Component {
  state = {
    author: {},
    loaded: false
  }

  componentDidMount = () => {
    if (isNaN(this.props.author)) {
      this.setState({
        author: this.props.author,
        loaded: true
      })
    } else {
      getProfileById(this.props.author).then(profile => {
        const author = {
          name: profile.title.rendered,
          bio: profile.excerpt.rendered,
          avatar: null
        }
        if (profile.featured_image && profile.featured_image.sizes) {
          author.avatar = acfImageToSrcArray(profile.featured_image.sizes)
        }
        this.setState({
          author,
          loaded: true
        })
      })
    }
  }

  render() {
    const { loaded, author } = this.state
    const { avatar, bio, name } = author

    if (!loaded) {
      return null
    }

    return (
      <div
        className={cc({
          Author: true,
          [this.props.className]: true
        })}
      >
        {avatar && (
          <div className="Author__media">
            <div
              role="img"
              title="Avatar"
              data-sizes="auto"
              data-bgset={srcArrayToSrcset(avatar)}
              className="lazyload cover aspect aspect--square"
            />
          </div>
        )}
        <div className="Author__content">
          <strong className="c-primary">Tekst</strong>
          <h4 className="Author__title">{name}</h4>
          {bio && <div className="Author__body">{renderHTML(bio)}</div>}
        </div>
      </div>
    )
  }
}
