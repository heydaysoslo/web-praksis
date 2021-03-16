import styled, { css } from 'styled-components'
import Text from './Text'

const Link = styled(Text)(
  ({ theme }) => css`
    border-bottom: 2px solid transparent;
    &:hover {
      border-color: ${theme.colors.red};
    }
  `
)

Link.defaultProps = {
  color: 'red',
}

export default Link
