import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent'
import { Provider, Consumer } from './components/utilities'
import NoMatchPage from './containers/NoMatchPage'
import Header from './components/Header'
import './styles/app.css'
import { routes } from './utils/routes'
import SvgFlame from './components/SvgFlame'
import ToTop from './components/utilities/ToTop'

class App extends Component {
  render() {
    return (
      <Router>
        <Provider>
          <Consumer>
            {ctx => (
              <div className="App">
                <div className="App__main">
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
                            return (
                              <r.component {...r.props} {...defaultProps} />
                            )
                          }}
                        />
                      ))}
                      <Route component={NoMatchPage} />
                    </Switch>
                  </div>
                </div>
                <footer className="AppFooter">
                  <div className="AppFooter__content">
                    <div className="AppFooter__left">
                      {ctx.state.settings &&
                        ctx.state.settings.policy_page && (
                          <a href={'/' + ctx.state.settings.policy_page.slug}>
                            {ctx.state.settings.policy_page.title}
                          </a>
                        )}
                    </div>
                    <div className="AppFooter__right">
                      Magasinet for unge sosialdemokrater fra{' '}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://auf.no"
                      >
                        AUF <SvgFlame />
                      </a>
                    </div>
                  </div>
                </footer>
                <div className="App__corner">
                  <ToTop />
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
                    Denne siden bruker cookies for å forbedre brukeropplevelsen.{' '}
                    {ctx.state.settings &&
                      ctx.state.settings.policy_page && (
                        <Fragment>
                          Les mer i vår{' '}
                          <a href={'/' + ctx.state.settings.policy_page.slug}>
                            {ctx.state.settings.policy_page.title}
                          </a>
                        </Fragment>
                      )}
                  </CookieConsent>
                </div>
              </div>
            )}
          </Consumer>
        </Provider>
      </Router>
    )
  }
}

export default App
