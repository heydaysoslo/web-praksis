import styled from 'styled-components'
import { variant, space } from 'styled-system'

const Text = styled.div`
  ${space}
  ${variant({
    prop: 'size',
    variants: {
      normal: {
        fontSize: [1, null, null, 2],
      },
      small: {
        fontSize: [14, null, 16],
        lineHeight: 'tight',
      },
      excerpt: {
        fontFamily: 'sans',
        lineHeight: 'tight',
      },
    },
  })}
`

Text.defaultProps = {
  size: 'normal',
}

export default Text
