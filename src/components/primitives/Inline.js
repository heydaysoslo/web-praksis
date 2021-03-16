import styled from 'styled-components'
import { system } from 'styled-system'
import Box from './Box'

const Inline = styled(Box)(
  {
    '&:not([hidden])': {
      display: 'block',
    },
    '& > *': {
      display: 'inline-block',
      verticalAlign: 'baseline',
    },
  },
  system({
    gap: {
      property: '& > *',
      scale: 'space',
      transform: (value, scale) => ({
        marginLeft: scale[value],
        marginTop: scale[value],
      }),
    },
  })
)

Inline.displayName = 'Inline'

export default Inline
