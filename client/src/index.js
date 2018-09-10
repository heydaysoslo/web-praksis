import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// Make sure
import 'lazysizes/plugins/bgset/ls.bgset'
import 'lazysizes/plugins/respimg/ls.respimg'
import 'lazysizes/lazysizes'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
