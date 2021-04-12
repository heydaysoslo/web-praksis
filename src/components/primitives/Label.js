import styled from 'styled-components'
import Box from './Box'

const Label = styled(Box)`
  display: inline-block;
  line-height: 1;
  text-transform: uppercase;
`

Label.defaultProps = {
  variant: 'normal',
  size: 'normal',
  fontSize: [0],
  color: 'red',
}

export default Label
