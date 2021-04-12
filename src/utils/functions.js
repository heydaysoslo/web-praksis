// https://github.com/30-seconds/30-seconds-of-code

export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
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

// export const elementContains = (parent, child) => {
//   if (!child) return false
//   return parent !== child && parent.contains(child)
// }

export const elementContains = (parent, child) => {
  return parent !== child && parent.contains(child)
}

export const elementContainsMulti = (parent, children) => {
  for (let i = 0; i < children.length; i++) {
    const item = children[i]
    if (elementContains(parent, item)) {
      return true
    }
  }
  return false
}

export const arrayShuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}
