import styled from 'styled-components'
import { variant } from 'styled-system'

const headingBase = {
  color: 'text',
  fontFamily: 'sans',
  fontWeight: 'bold',
  lineHeight: 'heading',
}

const Heading = styled('h1')(
  variant({
    prop: 'size',
    variants: {
      h1: {
        ...headingBase,
        fontSize: [42, null, 62],
      },
      h2: {
        ...headingBase,
        fontSize: [28, null, 42],
      },
      h3: {
        ...headingBase,
        fontSize: [28],
      },
      h4: {
        ...headingBase,
        fontSize: [18, null, null, 20],
      },
    },
  })
)

export default Heading
