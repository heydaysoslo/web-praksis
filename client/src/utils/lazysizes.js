// Make sure plugins are loaded before main script!
import 'lazysizes/plugins/bgset/ls.bgset'
import 'lazysizes/plugins/respimg/ls.respimg'
import 'lazysizes/lazysizes'

window.lazySizesConfig = window.lazySizesConfig || {}
window.lazySizesConfig.customMedia = {
  '--small': '(max-width: 320px)',
  '--medium_small': '(max-width: 640px)',
  '--medium': '(max-width: 1024px)',
  '--medium_large': '(max-width: 1600px)',
  '--large': '(max-width: 1920px)',
  '--xlarge': '(max-width: 2560px)'
}

export const emptyGif =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
