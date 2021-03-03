import React from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { getCategoryPageLink } from '../utils/routes'

const activeClassName = 'active'

const CategoryNavItemStyled = styled(NavLink)(
  ({ theme }) => css`
    white-space: nowrap;
    padding-top: 10px;
    padding-bottom: 10px;
    display: block;
    border-bottom: 2px solid transparent;
    &:hover {
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    }
    &.${activeClassName} {
      color: ${theme.colors.text};
      border-color: ${theme.colors.primary};
    }
  `
)

const CategoryNavItem = ({ cat, children }) => {
  return (
    <CategoryNavItemStyled
      activeClassName={activeClassName}
      to={cat?.link || getCategoryPageLink()}
    >
      {children || cat?.name}
    </CategoryNavItemStyled>
  )
}

export default CategoryNavItem
