import styled from 'styled-components'
import { variant, space } from 'styled-system'

const baseStyles = {
  fontSize: [1],
  py: [1],
  px: [1],
  bg: 'grays.0',
  borderRadius: [1],
}

const Label = styled.div`
  display: inline-block;
  line-height: 1;
  ${space}
  ${variant({
    prop: 'size',
    variants: {
      normal: {
        ...baseStyles,
      },
    },
  })}
`

Label.defaultProps = {
  size: 'normal',
}

export default Label
