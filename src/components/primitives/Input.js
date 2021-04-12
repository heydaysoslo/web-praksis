import styled, { css } from 'styled-components'

const StyledInput = styled.input(
  ({ theme }) => css`
    background: transparent;
    border: 0;
    font-size: inherit;
    appearance: none;
    border-radius: 0;
    font-family: inherit;

    border: 2px solid ${theme.colors.gray};
    width: 100%;
    max-width: 62rem;
    padding: 2rem;

    /* clears the ‘X’ from Internet Explorer */
    &[type='search'] {
      &::-ms-clear {
        display: none;
        width: 0;
        height: 0;
      }
      &::-ms-reveal {
        display: none;
        width: 0;
        height: 0;
      }
      /* clears the ‘X’ from webkit */
      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        display: none;
      }
    }

    &:focus {
      outline: none;
      background: ${theme.colors.gray};
      /* background: rgba(0, 0, 0, 0.15); */
    }
  `
)

export default StyledInput
