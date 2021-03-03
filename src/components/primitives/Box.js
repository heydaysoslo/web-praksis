// https://github.com/rebassjs/grid/blob/master/src/index.js

import styled from 'styled-components'
import {
  space,
  color,
  layout,
  flexbox,
  border,
  grid,
  compose,
} from 'styled-system'

const boxProps = compose(space, color, layout, flexbox, border, grid)

export const Box = styled('div')(
  {
    boxSizing: 'border-box',
  },
  boxProps
)

Box.displayName = 'Box'

// const Box = styled.div`
//   box-sizing: border-box;
//   ${space}
//   ${layout}
//   ${color}
//   ${border}
//   ${flexbox}
// `

export default Box
