import React from 'react'
import SplitBlock from './SplitBlock'
import CoverBlock from './CoverBlock'
import Container from './primitives/Container'

const FeatureBlock = (props) => {
  if (props?.image) {
    return (
      <Container my={[3, null, 5]}>
        <SplitBlock {...props} />
      </Container>
    )
  } else {
    return (
      <Container my={[3, null, 5]}>
        <CoverBlock {...props} />
      </Container>
    )
  }
}

export default FeatureBlock
