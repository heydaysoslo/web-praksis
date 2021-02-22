import React from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

const activeClassName = 'active'

const CategoryNavItemStyled = styled(NavLink)(
  ({ theme }) => css`
    white-space: nowrap;
    &.${activeClassName} {
      color: silver;
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
