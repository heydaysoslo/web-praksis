import React from 'react'
import Box from './primitives/Box'

const PreviewWarning = () => {
  return (
    <Box mb="4" p="2" bg="gray" textAlign="center">
      <span role="img">🚨</span> Forhåndsvisning <span role="img">🚨</span>
    </Box>
  )
}

export default PreviewWarning
