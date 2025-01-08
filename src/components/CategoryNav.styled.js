import styled, { css } from "styled-components";
import Container from "./primitives/Container";
import Flex from "./primitives/Flex";

export const Wrap = styled.div(
  ({ theme }) => css`
    overflow: hidden;
    height: 5.1rem;
    position: relative;

    ${theme.bp.lg} {
      height: 5.5rem;
    }

    &:after {
      content: "";
      display: block;
      width: 100%;
      border-bottom: 2px solid ${theme.colors.grays[0]};
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;
    }
  `
);

export const Nav = styled(Container)`
  overflow-x: scroll;
  overflow-y: hidden;
  height: 8rem; // hide scrollbar
`;

export const Items = styled(Flex)(
  ({ theme }) => css`
    display: inline-flex;
  `
);
