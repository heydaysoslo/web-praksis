import React from 'react'
import Box from './primitives/Box'
import NewsletterBlock from './NewsletterBlock'
import FeatureBlock from './FeatureBlock'
import TextBlock from './TextBlock'

const blockTypes = {
  feature: FeatureBlock,
  newsletter: NewsletterBlock,
  text: TextBlock,
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
