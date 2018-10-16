import React, { Component } from 'react'
import { emptyGif, acfImageToSrcset } from '../utils/lazysizes'

export default class AcfImage extends Component {
  render() {
    const { image } = this.props
    const srcset = acfImageToSrcset(image.sizes)
    return (
      <figure className="AcfImage">
        <img
          className="lazyload"
          src={image.sizes.lqip ? image.sizes.lqip : emptyGif}
          data-sizes="auto"
          data-srcset={srcset}
          alt={image.alt ? image.alt : image.title}
          data-aspectratio={`${image.width}/${image.height}`}
        />
        {image.caption && (
          <figcaption className="AcfImage__caption">{image.caption}</figcaption>
        )}
      </figure>
    )
  }
}
