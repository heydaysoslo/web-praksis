import { emSize } from '../utils/unit'

/*

Breakpoints

*/

// Define unitless breakpoints for calculation convenience
export const untilessBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1400,
  xxl: 1800,
}

// Populate the breakpoints array
const breakpoints = Object.keys(untilessBreakpoints).reduce((acc, key) => {
  // Convert unitless value to em as it's required by styled-system
  const emBp = emSize(untilessBreakpoints[key])
  // Add to brakpoint array
  acc.push(emBp)
  // Bind aliases to access by key (breakpoints.xs, breakpoints.sm, ...)
  acc[key] = emBp
  return acc
}, [])

/*

Typography

*/

const fontFamily = {
  sans: `'Replica', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
  serif: `'Tiempos Text', Times, serif`,
}

const fontWeight = {
  bold: 700,
  normal: 400,
}

const lineHeight = {
  heading: 1,
  body: 1.5,
  tight: 1.25,
}

const fontSizes = [14, 18, 20, 28, 32, 64]

/*

Color

*/

const color = {
  red: '#dc1e0f',
  text: '#373332',
  black: '#373332',
  white: '#fff',
  primary: '#dc1e0f',
  grays: ['#f1eeeb', '#b8b3ae', '#b8b3ae'],
}

/*

Space

*/
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]

export default {
  breakpoints,
  space,
  fontFamily,
  fontWeight,
  fontSizes,
  lineHeight,
  color,
}
