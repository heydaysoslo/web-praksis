import styled, { css } from 'styled-components'
import { variant, color, space, typography } from 'styled-system'

const Heading = styled.h1(
  ({ theme, $type }) => css`
    margin-top: 0;
    margin-bottom: 0;
    ${space}
    ${color}
    ${typography}
    ${$type === 'red' &&
    css`
      span {
        background-color: ${theme.colors.red};
        color: ${theme.colors.white};
      }
    `}
    ${$type === 'default' &&
    css`
      span {
        background-color: ${theme.colors.grays[0]};
      }
    `}
    ${$type === 'frame' &&
    css`
      span {
        border-bottom: 2px solid ${theme.colors.grays[0]};
      }
    `}
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
)

Heading.defaultProps = {
  size: 'h1',
  fontWeight: 'bold',
}

export default Heading
