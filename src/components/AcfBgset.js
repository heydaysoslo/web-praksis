import React, { Component } from 'react'
import { acfImageToSrcset } from '../utils/lazysizes'
import cc from 'classcat'

export default class AcfBgset extends Component {
  render() {
    const { image, aspect } = this.props
    const srcset = acfImageToSrcset(image.sizes)
    return (
      <div
        role="img"
        title={image.alt ? image.alt : image.title}
        data-sizes="auto"
        data-bgset={srcset}
        className={cc({
          'AcfBgset lazyload cover': true,
          [`aspect aspect--${aspect}`]: aspect,
          [this.props.className]: this.props.className
        })}
      />
    )
  }
}
