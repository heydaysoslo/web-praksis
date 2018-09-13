import React, { Component } from 'react'
import { emptyGif } from '../utils/lazysizes'
import uuid from 'uuid/v1'

export default class AcfImage extends Component {
  constructor(props) {
    super()

    const { image } = props

    // Remove sizes if multiple of same size
    const sizes = Object.keys(image.sizes).reduce((build, key) => {
      if (key.indexOf('-width') !== -1) {
        const value = image.sizes[key]
        const size = key.replace('-width', '')
        build[value] = {
          media: `--${size}`,
          src: image.sizes[size]
        }
      }
      return build
    }, {})

    const lastKey = Object.keys(sizes).pop()
    const mainImage = sizes[lastKey]

    // Remove the main source
    delete sizes[lastKey]

    this.state = {
      sizes,
      mainImage
    }
  }

  render() {
    const { image } = this.props
    const { sizes, mainImage } = this.state

    if (!sizes) {
      return null
    }
    return (
      <figure className="AcfImage">
        <picture>
          {Object.keys(sizes).map(size => {
            return (
              <source
                key={uuid()}
                data-srcset={sizes[size].src}
                media={sizes[size].media}
              />
            )
          })}
          <img
            src={image.sizes.lqip ? image.sizes.lqip : emptyGif}
            data-src={mainImage.src}
            className="AcfImage__img lazyload"
            alt={image.alt ? image.alt : image.title}
            data-sizes="auto"
            title={image.title}
            width={image.width}
            height={image.height}
          />
        </picture>
        {image.caption && (
          <figcaption className="AcfImage__caption">{image.caption}</figcaption>
        )}
      </figure>
    )
  }
}

/*

The image object
(returned by acf php function acf_get_attachment($id))

{
  "ID": 56,
  "id": 56,
  "title": "verksted",
  "filename": "verksted.jpg",
  "filesize": 144831,
  "url": "http://site.com/image.jpg",
  "link": "http://praksis.test/post/lorem-ipsum/verksted/",
  "alt": "",
  "author": "1",
  "description": "",
  "caption": "This image even has a caption",
  "name": "verksted",
  "status": "inherit",
  "uploaded_to": 22,
  "date": "2018-08-29 09:09:43",
  "modified": "2018-09-13 07:12:37",
  "menu_order": 0,
  "mime_type": "image/jpeg",
  "type": "image",
  "subtype": "jpeg",
  "icon": "http://praksis.test/wp-includes/images/media/default.png",
  "width": 1280,
  "height": 1600,
  "sizes": {
    "thumbnail": "http://site.com/image-320x320.jpg",
    "thumbnail-width": 320,
    "thumbnail-height": 320,
    "medium": "http://site.com/image-768x960.jpg",
    "medium-width": 768,
    "medium-height": 960,
    "medium_large": "http://site.com/image-1024x1280.jpg",
    "medium_large-width": 768,
    "medium_large-height": 960,
    "large": "http://site.com/image.jpg",
    "large-width": 1280,
    "large-height": 1600,
    "small": "http://site.com/image-320x400.jpg",
    "small-width": 320,
    "small-height": 400,
    "medium_small": "http://site.com/image-640x800.jpg",
    "medium_small-width": 640,
    "medium_small-height": 800,
    "xlarge": "http://site.com/image.jpg",
    "xlarge-width": 1280,
    "xlarge-height": 1600
  }

*/
