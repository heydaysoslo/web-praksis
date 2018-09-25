import React, { Component, Fragment } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookShareCount
} from 'react-share'
import ShareURL from '../components/ShareURL'
import cc from 'classcat'

export default class ShareButtons extends Component {
  render() {
    let { url } = this.props
    if (!url) {
      url = window.location.href
    }
    const hashtags = ''
    const title = 'Les dette innlegget fra Praksis'
    const description = `Les dette innlegget ${url}`
    return (
      <div
        className={cc({
          ShareButtons: true,
          [this.props.className]: true
        })}
      >
        <h4>Del innlegget</h4>
        <ul className="ShareButtons__list">
          <li className="ShareButtons__item">
            <ShareURL url={url} />
          </li>
          <li className="ShareButtons__item">
            <FacebookShareButton
              className="ShareButtons__button"
              url={url}
              hashtag={hashtags}
            >
              Facebook
              <FacebookShareCount className="ShareButtons__button" url={url}>
                {shareCount => <Fragment>{shareCount}</Fragment>}
              </FacebookShareCount>
            </FacebookShareButton>
          </li>
          <li className="ShareButtons__item">
            <TwitterShareButton
              className="ShareButtons__button"
              title={title}
              hashtags={[hashtags]}
              url={url}
            >
              Twitter
            </TwitterShareButton>
          </li>
          <li className="ShareButtons__item">
            <EmailShareButton
              className="ShareButtons__button"
              url={url}
              subject={title}
              body={description}
            >
              Email
            </EmailShareButton>
          </li>
        </ul>
      </div>
    )
  }
}
