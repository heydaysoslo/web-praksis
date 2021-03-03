import styled, { css } from 'styled-components'
import Box from './primitives/Box'

const ContainerStyled = styled(Box)(
  ({ theme }) => css`
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    max-width: 140rem;
  `
)

const Container = ({ children }) => {
  return <ContainerStyled px={[3, null, null, 4]}>{children}</ContainerStyled>
}

export default Container
