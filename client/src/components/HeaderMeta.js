import React, { Component } from 'react'
import Helmet from 'react-helmet'

export const striptags = html => {
  var tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText
}

class HeaderMeta extends Component {
  getCanonicalUrl = data => {
    return ''
  }

  getDescription = (data, key = '') => {
    if (data.yoast_seo && data.yoast_seo[key]) {
      return striptags(data.yoast_seo[key])
    }
    if (data.yoast_seo && data.yoast_seo.description) {
      return data.yoast_seo.description
    }
    return striptags(data.excerpt.rendered)
  }

  getTitle = (data, key = '') => {
    if (data.yoast_seo && data.yoast_seo[key]) {
      return striptags(data.yoast_seo[key])
    }
    if (data.yoast_seo && data.yoast_seo.title) {
      return data.yoast_seo.title
    }
    return striptags(data.title.rendered)
  }

  getImage = (data, key = '') => {
    if (data.yoast_seo && data.yoast_seo[key]) {
      return data.yoast_seo[key]
    }
    if (data.featured_image) {
      return data.featured_image.sizes.large
    }
    return false
  }

  render() {
    const { data } = this.props
    const siteName = 'Praksis'
    const twitterName = '@aufnorge'
    const title = this.getTitle(data, 'wp_title')
    const description = this.getDescription(data, 'description')

    const meta = [
      // Google / Search engines in general
      { name: 'description', content: description },
      { itemprop: 'name', content: siteName },
      { itemprop: 'description', content: description },
      { itemprop: 'image', content: this.getImage(data) },

      // Facebook
      { property: 'og:url', content: this.getCanonicalUrl(data) },
      { property: 'og:title', content: this.getTitle(data, 'og_title') },
      {
        property: 'og:description',
        content: this.getDescription(data, 'og_description')
      },
      { property: 'og:image', content: this.getImage(data, 'og_image') },
      { property: 'og:image:width', content: 1800 },
      { property: 'og:image:height', content: 945 },

      // Twitter
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: this.getTitle(data, 'twitter_title') },
      {
        name: 'twitter:description',
        content: this.getDescription(data, 'twitter_description')
      },
      { name: 'twitter:site', content: twitterName },
      { name: 'twitter:creator', content: twitterName },
      { name: 'twitter:image', content: this.getImage(data, 'twitter_image') }
    ]

    return <Helmet title={title} meta={meta} />
  }
}

export default HeaderMeta
