import React from 'react'
import Box from './primitives/Box'
import Heading from './primitives/Heading'
import WpTheContent from './WpTheContent'

const CoverBlock = ({ title, content }) => {
  return (
    <Box bg="gray" borderRadius={1} px={4} py={[6]} textAlign="center">
      {title && (
        <Heading size="h1" as="h2">
          {title}
        </Heading>
      )}
      {content && (
        <Box mt={3}>
          <WpTheContent className="editor" content={content} />
        </Box>
      )}
    </Box>
  )
}

export default CoverBlock
