import React from 'react'
import Container from './primitives/Container'
import WpTheContent from './WpTheContent'

const TextBlock = ({ content }) => {
  if (!content) {
    return null
  }
  return (
    <Container mt={[4, null, 5]} size="narrow">
      <WpTheContent className="editor" content={content} />
    </Container>
  )
}

export default TextBlock
