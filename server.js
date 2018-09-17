require('dotenv').load()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const compression = require('compression')

const app = express()

var whitelist = [
  'http://localhost:5000',
  'http://web-praksis.herokuapp.com',
  'https://web-praksis.herokuapp.com'
]
var corsOptions = {
  allowedHeaders: ['X-WP-Nonce'],
  origin: function(origin, callback) {
    console.log('ORIGIN: ', origin)
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(compression())
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(logger('dev'))
app.use(cors(corsOptions))
app.use(require('prerender-node'))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  console.log('page request fired')
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Node listening on ${port}`)
