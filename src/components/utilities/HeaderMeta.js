import React, { Component } from 'react'
import { Consumer } from '../utilities'
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

  getDescription = (data, key = '', bloginfo = {}) => {
    if (data.yoast_seo && data.yoast_seo[key]) {
      return striptags(data.yoast_seo[key])
    }
    if (data.yoast_seo && data.yoast_seo.description) {
      return data.yoast_seo.description
    }
    if (data.excerpt && data.excerpt.rendered) {
      return striptags(data.excerpt.rendered)
    }
    if (bloginfo.description) {
      return bloginfo.description
    }
    return ''
  }

  getTitle = (data, key = '', bloginfo = {}) => {
    if (data.yoast_seo && data.yoast_seo[key]) {
      return striptags(data.yoast_seo[key])
    }
    if (data.yoast_seo && data.yoast_seo.title) {
      return data.yoast_seo.title
    }
    if (data.title && data.title.rendered) {
      return striptags(data.title.rendered)
    }
    if (bloginfo.name) {
      return bloginfo.name
    }
    return ''
  }

  getImage = (data, key = '', social = {}) => {
    if (data.yoast_seo && data.yoast_seo[key]) {
      return data.yoast_seo[key]
    }
    if (data.featured_image) {
      return data.featured_image.sizes.large
    }
    if (social.og_default_image) {
      return social.og_default_image
    }
    return false
  }

  render() {
    let { data } = this.props
    if (!data) {
      data = {}
    }
    // http://praksis.local/api/hey/v1/settings

    return (
      <Consumer>
        {ctx => {
          if (!ctx.state.settings) {
            return null
          }

          const { wpseo, bloginfo } = ctx.state.settings

          const { social } = wpseo
          const title = this.getTitle(data, 'wp_title', bloginfo)
          const description = this.getDescription(data, 'description', bloginfo)
          const siteName = bloginfo.name

          /**
           * General tags
           */

          const meta = [
            { name: 'description', content: description },
            { itemprop: 'name', content: siteName },
            { itemprop: 'description', content: description },
            { itemprop: 'image', content: this.getImage(data) }
          ]

          /**
           * Opengraph
           */

          if (social.opengraph) {
            // social.og_frontpage_title
            // social.og_frontpage_desc
            // social.og_frontpage_image

            meta.push({
              property: 'og:title',
              content: this.getTitle(data, 'og_title', bloginfo)
            })
            meta.push({
              property: 'og:description',
              content: this.getDescription(data, 'og_description', bloginfo)
            })
            meta.push({
              property: 'og:url',
              content: this.getCanonicalUrl(data)
            })

            const og_image = this.getImage(data, 'og_image', social)
            if (og_image) {
              meta.push({ property: 'og:image', content: og_image })
              meta.push({ property: 'og:image:width', content: 1800 })
              meta.push({ property: 'og:image:height', content: 945 })
            }
          }

          /**
           * Twitter
           */

          if (social.twitter) {
            // Twitter name

            meta.push({
              name: 'twitter:card',
              content: social.twitter_card_type
                ? social.twitter_card_type
                : 'summary'
            })

            meta.push({
              name: 'twitter:title',
              content: this.getTitle(data, 'twitter_title', bloginfo)
            })

            meta.push({
              name: 'twitter:description',
              content: this.getDescription(
                data,
                'twitter_description',
                bloginfo
              )
            })

            if (social.twitter_site) {
              meta.push({ name: 'twitter:site', content: social.twitter_site })
              // Creator: Might be the current author of the article!
              meta.push({
                name: 'twitter:creator',
                content: social.twitter_site
              })
            }

            const twitter_image = this.getImage(data, 'twitter_image', social)
            if (twitter_image) {
              meta.push({ name: 'twitter:image', content: twitter_image })
              // twitter:image:alt
            }
          }

          return (
            <Helmet title={title} meta={meta}>
              {bloginfo.rss2_url && (
                <link
                  rel="alternate"
                  type="application/rss+xml"
                  title="RSS Feed"
                  href={bloginfo.rss2_url}
                />
              )}
            </Helmet>
          )
        }}
      </Consumer>
    )
  }
}

export default HeaderMeta
