import enquire from 'enquire.js'

const parseMqStyleToObject = str => {
  var styleObject = {}
  if (typeof str !== 'string') {
    return styleObject
  }
  str = str.trim().slice(1, -1) // browsers re-quote string style values
  styleObject = str.split('&').reduce(function(ret, param) {
    var parts = param.replace(/\+/g, ' ').split('=')
    var key = parts[0]
    var val = parts[1]
    key = decodeURIComponent(key)

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = typeof val === 'undefined' ? null : decodeURIComponent(val)

    if (!ret.hasOwnProperty(key)) {
      ret[key] = val
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val)
    } else {
      ret[key] = [ret[key], val]
    }
    return ret
  }, {})

  return styleObject
}

const mqlistener = callback => {
  const metaExists = document.getElementsByClassName('mq-listener')
  if (!metaExists.length) {
    const head = document.getElementsByTagName('head')[0]
    const mqMeta = document.createElement('meta')
    mqMeta.classList.add('mq-listener')
    head.appendChild(mqMeta)
    const extractedStyles = window
      .getComputedStyle(mqMeta, null)
      .getPropertyValue('font-family')
    const namedQueries = parseMqStyleToObject(extractedStyles)
    const mqKeys = Object.keys(namedQueries)
    for (let key in namedQueries) {
      if (namedQueries.hasOwnProperty(key)) {
        enquire.register(`only screen and (min-width: ${namedQueries[key]})`, {
          match: () => {
            callback(key)
          },
          unmatch: () => {
            callback(mqKeys[mqKeys.indexOf(key) - 1])
          }
        })
      }
    }
  }
}

export default mqlistener
