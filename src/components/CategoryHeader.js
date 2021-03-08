import React from 'react'
import Box from './primitives/Box'
import Heading from './primitives/Heading'
import Label from './primitives/Label'
import Text from './primitives/Text'

const CategoryHeader = ({ label, title, intro }) => {
  return (
    <Box as="header" textAlign={{ xs: 'left', lg: 'center' }} mt={4}>
      {label && <Label>{label}</Label>}
      <Heading mt={[1]} size="h1" as="h1">
        {title}
      </Heading>
      {intro && <Text>{intro}</Text>}
    </Box>
  )
}

export default CategoryHeader
