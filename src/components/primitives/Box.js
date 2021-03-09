// https://github.com/rebassjs/grid/blob/master/src/index.js

import styled from 'styled-components'
import {
  space,
  color,
  layout,
  flexbox,
  border,
  grid,
  typography,
  width,
  height,
  compose,
} from 'styled-system'

const boxProps = compose(
  width,
  height,
  space,
  color,
  layout,
  flexbox,
  border,
  grid,
  typography
)

const Box = styled.div`
  box-sizing: border-box;
  ${boxProps}
`

Box.displayName = 'Box'

export default Box
