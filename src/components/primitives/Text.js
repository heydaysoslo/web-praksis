import styled from 'styled-components'
import { variant, space, compose } from 'styled-system'

const Text = styled.div(
  compose({
    fontFamily: 'serif',
    fontWeight: 'normal',
    lineHeight: 'body',
    fontSize: [18, 20],
  }),
  variant({
    prop: 'size',
    variants: {
      small: {
        fontSize: 14,
      },
      excerpt: {
        fontFamily: 'sans',
        lineHeight: 'tight',
      },
    },
  }),
  space
)

export default Text
