import styled from 'styled-components'
import { system } from 'styled-system'
import Box from './Box'

const Stack = styled(Box)(
  system({
    gap: {
      property: '&& > * + *',
      scale: 'space',
      transform: (value, scale) => ({
        marginTop: scale[value],
      }),
    },
  })
)

export default Stack
