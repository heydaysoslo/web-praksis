import styled from 'styled-components'
import { variant, space, typography } from 'styled-system'

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  ${space}
  ${typography}
  ${variant({
    prop: 'size',
    variants: {
      h1: {
        fontSize: ['10vw', null, 62],
        lineHeight: 1.1,
      },
      h2: {
        fontSize: [28, null, 42],
        lineHeight: 1.1,
      },
      h3: {
        fontSize: [28],
        lineHeight: 1.1,
      },
      h4: {
        fontSize: [18, null, null, 20],
      },
    },
  })}
`

Heading.defaultProps = {
  size: 'h1',
  fontWeight: 'bold',
}

export default Heading
