import styled from 'styled-components'
import { variant, space } from 'styled-system'
import Box from './Box'

const Container = styled(Box)`
  margin: 0 auto;
  & & {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  ${space}
  ${variant({
    prop: 'size',
    variants: {
      default: {
        maxWidth: '1400px',
      },
      fluid: {
        maxWidth: 'none',
      },
      narrow: {
        maxWidth: '42.5em',
      },
    },
  })}
`

Container.defaultProps = {
  size: 'default',
  px: [3, null, null, 4],
}

export default Container
