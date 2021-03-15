import React from 'react'
import Flex from './primitives/Flex'
import Box from './primitives/Box'
import Text from './primitives/Text'
import Container from './primitives/Container'

const Footer = () => {
  return (
    <Box as="footer" mt={[4]} pb={[5]}>
      <Container>
        <Flex borderTop={[1]} pt={[3, 3, 5]}>
          <Box width={[1, 1, 1 / 2]}>
            <Text size="md">
              Praksis er medlemsmagasinet til AUF. Her kan du bli kjent med AUF
              og AUFerne våre.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
