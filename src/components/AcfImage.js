import React from 'react'
import { emptyGif, acfImageToSrcset } from '../utils/lazysizes'
import Text from './primitives/Text'

const AcfImage = ({ image }) => {
  const srcset = acfImageToSrcset(image.sizes)
  //
  // Consider listening to image changes and set srcset based on image
  //
  // const [srcset, setSrcset] = useState(acfImageToSrcset(image.sizes))
  // const onMount = () => {
  //   setSrcset(acfImageToSrcset(image.sizes))
  // }
  // useEffect(onMount, [image.id])
  // if (!srcset) {
  //   return null
  // }

  return (
    <figure
      style={{
        maxWidth: `${image.width}px`,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <img
        className="lazyload"
        src={image.sizes.lqip ? image.sizes.lqip : emptyGif}
        data-sizes="auto"
        data-srcset={srcset}
        alt={image.alt ? image.alt : image.title}
        data-aspectratio={`${image.width}/${image.height}`}
      />
      {image.caption && (
        <Text as="figcaption" size="small" mt={[2]}>
          {image.caption}
        </Text>
      )}
    </figure>
  )
}

export default AcfImage
