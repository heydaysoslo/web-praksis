import React from 'react'
import Box from './primitives/Box'
import WpTheContent from '../components/WpTheContent'
import Heading from './primitives/Heading'
import AcfImage from './AcfImage'
import Container from './primitives/Container'
import Flex from './primitives/Flex'

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

const blockTypes = {
  feature: FeatureBlock,
}

const resolveBlock = (block) => {
  return blockTypes[block?.acf_fc_layout] || null
}

const Pagebuilder = ({ blocks, ...props }) => {
  return (
    <Box {...props}>
      {blocks.map((item) => {
        const Block = resolveBlock(item)
        if (Block) {
          return <Block {...item} />
        }
      })}
    </Box>
  )
}

export default Pagebuilder
