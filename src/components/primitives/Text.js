import styled from 'styled-components'
import { variant, typography, space, color } from 'styled-system'

const Text = styled.div`
  ${color}
  ${typography}
  ${space}
  ${variant({
    prop: 'size',
    variants: {
      normal: {
        fontSize: [1, null, null, 2],
        lineHeight: 'normal',
      },
      small: {
        fontSize: [0, null, 16],
        lineHeight: 'tight',
      },
      excerpt: {
        fontFamily: 'sans',
        lineHeight: 'tight',
        fontSize: [1],
      },
      md: {
        fontFamily: 'sans',
        fontSize: [3],
        lineHeight: 'tight',
      },
    },
  })}
`

Text.defaultProps = {
  size: 'normal',
}

export default Text
