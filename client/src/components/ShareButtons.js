import React, { Component, Fragment } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookShareCount
} from 'react-share'

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
      <div className="ShareButtons">
        <h4>Del innlegget</h4>
        <div className="ShareButtons__group">
          <FacebookShareButton url={url} hashtag={hashtags}>
            Facebook
            <FacebookShareCount url={url}>
              {shareCount => <Fragment>{shareCount}</Fragment>}
            </FacebookShareCount>
          </FacebookShareButton>
          <TwitterShareButton title={title} hashtags={[hashtags]} url={url}>
            Twitter
          </TwitterShareButton>
          <EmailShareButton url={url} subject={title} body={description}>
            Email
          </EmailShareButton>
        </div>
      </div>
    )
  }
}
