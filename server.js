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
  'https://web-praksis.herokuapp.com',
  'https://208503-www.web.tornado-node.net'
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

// Put all API endpoints under '/api'
app.post('/api/intercom', (req, res) => {
  var Intercom = require('intercom-client') // TODO possible to import subset of intercom-client to make package smaller?
  const client = new Intercom.Client({
    token: process.env.INTERCOM_ACCESS_TOKEN
  })
  client.users.create(req.body, function(r) {
    res.json(r)
  })
})

app.post('/api/mail', (req, res) => {
  console.log('fired', req.body)
  const nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport(
    { sendmail: true },
    {
      from: req.body.email,
      to: 'niiimon@gmail.com',
      subject: 'Ny lege har vist interesse!'
    }
  )
  transporter.sendMail(
    {
      html: `
  <p>
    <strong>Navn</strong>
    ${req.body.name}
  </p>
  <p>
    <strong>E-post</strong>
    ${req.body.email}
  </p>
  <p>
    <strong>Telefon</strong>
    ${req.body.phone}
  </p>
  <p>
    <strong>HPR</strong>
    ${req.body.hpr}
  </p>
  `
    },
    (err, info) => {
      if (err) {
        res.json({
          error: true,
          message: 'Noe gikk galt'
        })
      } else {
        res.json(info)
      }
    }
  )
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  console.log('page request fired')
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Node listening on ${port}`)
