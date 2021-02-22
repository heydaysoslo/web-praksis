import styled from 'styled-components'
import { variant } from 'styled-system'

const textBase = {
  color: 'red',
  fontFamily: 'serif',
  fontWeight: 'normal',
  lineHeight: 'body',
  fontSize: [10],
}

const Text = styled('div')(
  textBase,
  variant({
    prop: 'size',
    variants: {
      small: {
        ...textBase,
        fontSize: [10],
      },
    },
  })
)

export default Text
