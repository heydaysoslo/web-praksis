import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { getCategoryPageLink } from "../utils/routes";

const activeClassName = "active";

const CategoryNavItemStyled = styled(NavLink)(
  ({ theme, $variant }) => css`
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
    ${$variant === "pill" &&
    css`
      span {
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
        padding: 2px 4px;
        border-radius: 4px;
      }
    `}
  `
);

const CategoryNavItem = ({ cat, children, variant }) => {
  return (
    <CategoryNavItemStyled
      $variant={variant}
      className={({ isActive }) => (isActive ? activeClassName : "")}
      to={cat?.link || getCategoryPageLink()}
    >
      <span>{children || cat?.name}</span>
    </CategoryNavItemStyled>
  );
};

export default CategoryNavItem;
