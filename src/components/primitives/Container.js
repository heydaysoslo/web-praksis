import styled from 'styled-components'
import { variant, system } from 'styled-system'
import Box from './Box'

const baseProps = {
  px: [3, null, null, 4],
}

const Container = styled(Box)`
  margin: 0 auto;
  ${variant({
    prop: 'size',
    variants: {
      default: {
        ...baseProps,
        maxWidth: '1400px',
      },
      fluid: {
        ...baseProps,
        maxWidth: 'none',
      },
    },
  })}
`

Container.defaultProps = {
  size: 'default',
}

export default Container
