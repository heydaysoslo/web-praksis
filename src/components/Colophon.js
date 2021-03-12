import React, { useContext } from 'react'
import SiteContext from './utilities/Context'
import SvgFlame from './SvgFlame'
import styled, { css } from 'styled-components'
import Box from './primitives/Box'

const ColophonStyled = styled(Box)(
  ({ theme }) => css`
    position: fixed;
    top: 100%;
    left: 0;
    width: 100vh;
    transform: rotate(-90deg);
    transform-origin: top left;
    a {
      color: ${theme.colors.white};
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }
  `
)

const Colophon = () => {
  const ctx = useContext(SiteContext)
  return (
    <ColophonStyled
      height={{ xs: '1rem', md: '4rem' }}
      bg="red"
      color="white"
      as="aside"
      fontSize="small"
    >
      <Box
        lineHeight="1"
        p="1rem"
        justifyContent="space-between"
        flexWrap="nowrap"
        display={{ xs: 'none', md: 'flex' }}
      >
        <div>
          {ctx.state.settings && ctx.state.settings.policy_page && (
            <a href={'/' + ctx.state.settings.policy_page.slug}>
              {ctx.state.settings.policy_page.title}
            </a>
          )}
        </div>
        <div>
          Magasinet for unge sosialdemokrater fra{' '}
          <a target="_blank" rel="noopener noreferrer" href="http://auf.no">
            AUF <SvgFlame />
          </a>
        </div>
      </Box>
    </ColophonStyled>
  )
}

export default Colophon
