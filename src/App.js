import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Provider, Consumer } from './components/utilities'
import NoMatchPage from './templates/NoMatchPage'
import Header from './components/Header'
import './styles/app.css'
import { routes } from './utils/routes'
import theme from './style/theme'
import CategoryNav from './components/CategoryNav'
import Footer from './components/Footer'
import FooterActions from './components/FooterActions'

class App extends Component {
  render() {
    return (
      <Router>
        <Provider>
          <Consumer>
            {(ctx) => (
              <ThemeProvider theme={theme}>
                <div className="App">
                  <div className="App__main">
                    <Header {...this.props} />
                    <CategoryNav />
                    <div className="App__content">
                      <Switch>
                        {routes.map((r) => (
                          <Route
                            key={r.path}
                            exact={r.exact}
                            path={r.path}
                            render={(defaultProps) => {
                              // Pass props from routes setup
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
                  <Footer />
                  <FooterActions />
                </div>
              </ThemeProvider>
            )}
          </Consumer>
        </Provider>
      </Router>
    )
  }
}

export default App
