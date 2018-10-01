import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent'

import NoMatchPage from './containers/NoMatchPage'
import Header from './components/Header'
import './styles/app.css'
import { routes } from './utils/routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Header {...this.props} />
            <div className="App__content">
              <Switch>
                {routes.map(r => (
                  <Route
                    key={r.path}
                    exact={r.exact}
                    path={r.path}
                    render={defaultProps => {
                      // Support passing props from routes setup
                      return <r.component {...r.props} {...defaultProps} />
                    }}
                  />
                ))}
                <Route component={NoMatchPage} />
              </Switch>
            </div>
          </Fragment>
        </Router>
        <CookieConsent
          // acceptOnScroll={true}
          // acceptOnScrollPercentage={25}
          disableStyles={true}
          location="bottom"
          buttonText="Jeg godtar"
          buttonClasses="cookieConsent__button"
          contentClasses="cookieConstent__content"
          expires={150}
        >
          Denne siden bruker cookies for å forbedre brukeropplevelsen.
        </CookieConsent>
      </div>
    )
  }
}

export default App
