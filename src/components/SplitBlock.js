import React from 'react'
import Box from './primitives/Box'
import Flex from './primitives/Flex'
import Heading from './primitives/Heading'
import WpTheContent from './WpTheContent'
import AcfImage from './AcfImage'

const SplitBlock = ({ title, content, image }) => {
  return (
    <Flex flexWrap="wrap" flexDirection="row-reverse" borderRadius={1}>
      <Box
        width={{ xs: 1, md: 1 / 2 }}
        style={{ position: 'relative' }}
        p={{ xs: 3, md: 4, lg: 5 }}
      >
        <AcfImage
          style={{ minHeight: '100%', height: '100%' }}
          image={image}
          aspect="square"
        />
      </Box>
      <Box width={{ xs: 1, md: 1 / 2 }} p={{ xs: 3, md: 4, lg: 5 }}>
        <Flex alignItems="center" minHeight="100%" textAlign="center">
          <Box width="100%">
            <Heading size="h1" as="h2">
              {title}
            </Heading>
            {content && (
              <Box mt={3}>
                <WpTheContent className="editor" content={content} />
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default SplitBlock
