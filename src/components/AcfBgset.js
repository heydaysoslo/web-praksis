import React from 'react'
import { acfImageToSrcset } from '../utils/lazysizes'
import cc from 'classcat'

const AcfBgset = ({ image, aspect, className }) => {
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
        [className]: className,
      })}
    />
  )
}

export default AcfBgset
