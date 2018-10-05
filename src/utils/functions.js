// https://github.com/30-seconds/30-seconds-of-code

export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
})

export const getDocumentHeight = () => {
  const body = document.body
  const html = document.documentElement
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )
}

export const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

export const elementContains = (parent, child) => {
  if (!child) return false
  return parent !== child && parent.contains(child)
}
