import styled from 'styled-components'
import { color, space, fontSize, border, variant } from 'styled-system'
import Box from './Box'

const Button = styled(Box)(
  {
    appearance: 'button',
    border: 0,
    outline: 0,
    display: 'inline-block',
    cursor: 'pointer',
  },
  color,
  space,
  fontSize,
  border,
  variant({
    variants: {
      default: {
        ':hover': {
          borderColor: 'red',
        },
        ':active': {
          bg: 'grays.0',
        },
      },
    },
  })
)

Button.defaultProps = {
  color: 'red',
  px: 3,
  py: 2,
  border: 1,
  variant: 'default',
}

Button.displayName = 'Button'

export default Button

// .Button {
//   border: 2px solid $c-light-gray;
//   color: $c-primary;
//   padding: rem-calc(10 20);
//   transition: border-color 0.2s ease;
//   &:hover {
//     border-color: $c-primary;
//   }
// }
