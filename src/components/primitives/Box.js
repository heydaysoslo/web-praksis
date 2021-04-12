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

const Box = styled.div(
  {
    boxSizing: 'border-box',
  },
  compose(
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
)

Box.displayName = 'Box'

export default Box
