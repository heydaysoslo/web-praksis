import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Provider, Consumer } from './components/utilities/Context'
import NoMatchPage from './templates/NoMatchPage'
import Header from './components/Header'
import './styles/app.css'
import { routes } from './utils/routes'
import theme from './style/theme'
import CategoryNav from './components/CategoryNav'
import Colophon from './components/Colophon'
import FooterActions from './components/FooterActions'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <Provider>
        <Consumer>
          {(ctx) => (
            <ThemeProvider theme={theme}>
              <div className="App">
                <div className="App__main">
                  <Header />
                  <CategoryNav categories={ctx?.state?.categories} />
                  <div className="App__content">
                    <Routes>
                      {routes.map((r) => (
                        <Route
                          key={r.path}
                          path={r.path}
                          element={
                            <r.component {...r.props} />
                          }
                        />
                      ))}
                      <Route path="*" element={<NoMatchPage />} />
                    </Routes>
                    <Footer />
                  </div>
                </div>
                <Colophon />
                <FooterActions />
              </div>
            </ThemeProvider>
          )}
        </Consumer>
      </Provider>
    </Router>
  )
}

export default App
