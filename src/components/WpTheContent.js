import React, { useEffect, useState, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser'
import autolinker from 'autolinker'

const WpTheContent = ({ className, content }) => {
  const [parsedContent, setParsedContent] = useState(null)
  const ref = useRef()

  const makeEmbedsResponsive = () => {
    if (!ref.current) {
      return null
    }
    const embeds = ref.current.getElementsByClassName('embed')
    if (embeds) {
      const existingPusher = ref.current.getElementsByClassName('embed__pusher')
      Object.keys(embeds).forEach((key) => {
        const el = embeds[key]
        if (!elementContainsMulti(el, existingPusher)) {
          let iframes = el.getElementsByTagName('iframe')
          if (iframes.length) {
            const iframe = iframes[0]
            const w = parseFloat(iframe.getAttribute('width'))
            const h = parseFloat(iframe.getAttribute('height'))
            if (h && w) {
              const pusher = document.createElement('div')
              pusher.className = 'embed__pusher'
              pusher.style.paddingTop = (h / w) * 100 + '%'
              el.appendChild(pusher)
            }
          }
        }
      })
    }
  }

  const onMount = () => {
    const theContent = autolinker.link(content, {
      className: 'editorLink',
      replaceFn: (match) => {
        switch (match.getType()) {
          case 'email':
            const email = match.getEmail()
            return `<a className="editorLink editorLink-email" href="mailto:${email}">${email}</a>`
          default:
            return
        }
      },
    })
    setParsedContent(ReactHtmlParser(theContent))
    makeEmbedsResponsive()
  }
  useEffect(onMount, [content])

  return (
    <div className={className} ref={ref}>
      {parsedContent}
    </div>
  )
}

export default WpTheContent
