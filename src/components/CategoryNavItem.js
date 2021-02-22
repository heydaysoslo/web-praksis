import React from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

const activeClassName = 'active'

const CategoryNavItemStyled = styled(NavLink)(
  ({ theme }) => css`
    white-space: nowrap;
    &:hover {
      color: ${theme.color.primary};
    }
    &.${activeClassName} {
      color: ${theme.color.primary};
    }
  `
)

const CategoryNavItem = ({ cat }) => {
  return (
    <CategoryNavItemStyled activeClassName={activeClassName} to={cat.link}>
      {cat.name}
    </CategoryNavItemStyled>
  )
}

export default CategoryNavItem
