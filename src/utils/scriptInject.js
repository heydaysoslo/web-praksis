/*

Inject scripts from HTML content

Usage:

import { injectInlineScripts } from 'scriptInject'
injectInlineScripts(bodyText)
@returns []

*/

import htmlparser from 'htmlparser2'
import hash from 'object-hash'

const injectScript = tag => {
  return new Promise((resolve, reject) => {
    // Generate script id from content
    const scriptId = hash(tag)
    const { attributes, innerHTML } = tag

    // Remove script if already exists
    const existingScript = document.getElementById(scriptId)
    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript)
    }

    // Create the script element
    const scriptTag = document.createElement('script')
    scriptTag.async = true
    scriptTag.defer = true
    scriptTag.id = scriptId
    scriptTag.type = 'text/javascript'

    // Add attributes
    for (const key in attributes) {
      scriptTag.setAttribute(key, attributes[key])
    }

    // Add inner content
    if (tag.innerHTML) {
      scriptTag.innerHTML = innerHTML
    }

    // If script is injected by source it will have a load callback
    scriptTag.addEventListener('load', () => {
      resolve(attributes.src)
    })

    scriptTag.addEventListener('error', e => {
      reject(e)
    })

    if (!attributes.src) {
      resolve(innerHTML)
    }

    document.body.appendChild(scriptTag)
  })
}

/*
Helper function to get all script tags
*/
const getTagsByName = (tagName, htmlString) => {
  let tags = [],
    currentTag

  const parser = new htmlparser.Parser(
    {
      onopentag: (name, attributes) => {
        if (name === tagName) {
          currentTag = { attributes }
        }
      },
      ontext: text => {
        if (currentTag) {
          currentTag.innerHTML = text
          tags.push(currentTag)
          currentTag = undefined
        }
      }
    },
    { decodeEntities: true }
  )

  parser.write(htmlString)
  parser.end()

  return tags
}

/*
Main function
Gets all scripts in a html string and injects them
*/

export const injectInlineScripts = bodyText => {
  const scriptTags = getTagsByName('script', bodyText)
  scriptTags.forEach(tag => injectScript(tag))
  return scriptTags
}
