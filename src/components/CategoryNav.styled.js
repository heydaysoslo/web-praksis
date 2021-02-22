import styled, { css } from 'styled-components'
import Box from './primitives/Box'

const CategoryNavStyled = styled(Box)(
  ({ theme }) => css`
    border-bottom: 2px solid ${theme.color.grays[0]};
  `
)

export default CategoryNavStyled
