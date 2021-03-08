import React from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import Button from '../components/primitives/Button'

const NoMatchPage = () => {
  return (
    <article className="Article Article--single container">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="Article__header">
        <h1 className="Article__title">Oops!</h1>
        <div className="Article__intro">
          <p>Kunne ikke finne siden du lette etter</p>
        </div>
      </header>
      <div className="Article__content" style={{ textAlign: 'center' }}>
        <Button as={Link} to="/">
          Gå tilbake til forsiden
        </Button>
      </div>
    </article>
  )
}

export default NoMatchPage
