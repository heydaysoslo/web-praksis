// Make sure plugins are loaded before main script!
import 'lazysizes/plugins/aspectratio/ls.aspectratio'
import 'lazysizes/plugins/bgset/ls.bgset'
import 'lazysizes/plugins/respimg/ls.respimg'
import 'lazysizes/lazysizes'

export const emptyGif =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export const acfImageToSrcArray = (sizes, maxSize = 99999) => {
  // Remove sizes if multiple of same size
  const sizesFiltered = Object.keys(sizes).reduce((build, key) => {
    if (key.indexOf('-width') !== -1) {
      const value = sizes[key]
      if (value <= maxSize) {
        const size = key.replace('-width', '')
        build[value] = sizes[size]
      }
    }
    return build
  }, {})

  return sizesFiltered
}

export const acfImageToSrcset = (sizes, maxSize = 99999) => {
  const sizesFiltered = acfImageToSrcArray(sizes, maxSize)
  return srcArrayToSrcset(sizesFiltered)
}

export const srcArrayToSrcset = (sizes) => {
  const srcsetArray = Object.keys(sizes).map((size) => {
    return `${sizes[size]} ${size}w`
  })
  return srcsetArray.join(', ')
}

/*

Sizes array returned from ACF

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
