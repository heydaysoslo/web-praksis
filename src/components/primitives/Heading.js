import styled from 'styled-components'
import { variant, space } from 'styled-system'

const Heading = styled.h1`
  ${space}
  ${variant({
    prop: 'size',
    variants: {
      h1: {
        fontSize: [42, null, 62],
      },
      h2: {
        fontSize: [28, null, 42],
      },
      h3: {
        fontSize: [28],
      },
      h4: {
        fontSize: [18, null, null, 20],
      },
    },
  })}
`

Text.defaultProps = {
  size: 'h1',
}

export default Heading
