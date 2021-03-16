import React, { Component } from 'react'
import ScrollToggle from './ScrollToggle'
import smoothscroll from 'smoothscroll-polyfill'
import styled, { css } from 'styled-components'
smoothscroll.polyfill()

const ToTopButton = styled.button(
  ({ theme, $visible }) => css`
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    border-radius: 99px;
    color: ${theme.colors.white};
    background: ${theme.colors.red};
    margin-bottom: 2rem;
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease;
    ${$visible &&
    css`
      visibility: visible;
      opacity: 1;
    `}
  `
)

export default class ToTop extends Component {
  scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }

  render() {
    return (
      <ScrollToggle>
        {({ visible }) => {
          return (
            <ToTopButton
              aria-label="Tilbake til topp"
              onClick={this.scrollToTop}
              $visible={visible}
            >
              &uarr;
            </ToTopButton>
          )
        }}
      </ScrollToggle>
    )
  }
}
