import styled, { css } from 'styled-components'

export const Number = styled.div(
  ({ theme, $active }) => css`
    border-radius: 4px;
    padding: 4px 8px;
    border: 1px solid ${theme.colors.grays[0]};

    &:hover {
      color: ${theme.colors.red};
      border-color: ${theme.colors.red};
    }

    ${$active &&
    css`
      pointer-events: none;
      border-color: ${theme.colors.grays[0]};
      background: ${theme.colors.grays[0]};
    `}
  `
)

export const PageLink = styled.a(
  ({ theme, $active }) => css`
    /* margin-left: 20px; */
    padding-bottom: 2px;
    border-bottom: 1px solid transparent;

    &:hover {
      color: ${theme.colors.red};
      border-color: ${theme.colors.red};
    }

    ${$active &&
    css`
      pointer-events: none;
      border-color: transparent;
      color: ${theme.colors.grays[1]};
    `}
  `
)
