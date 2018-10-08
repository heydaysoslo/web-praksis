import 'react-app-polyfill/ie11'
import 'core-js/es6'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './utils/lazysizes'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
