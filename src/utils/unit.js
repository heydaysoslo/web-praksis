export const emSize = (val) => {
  if (typeof val === 'number') {
    return `${val / 16}em`
  }
  return val
}
export const remSize = (px) => `${px / 10}rem`
export const emCalc = (px) => px / 16
