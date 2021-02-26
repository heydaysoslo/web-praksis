import React, { useContext } from 'react'
import SiteContext from './utilities/Context'
import CookieConsent from 'react-cookie-consent'
import ToTop from './utilities/ToTop'

const FooterActions = () => {
  const ctx = useContext(SiteContext)
  return (
    <div className="App__corner">
      <ToTop />
      <CookieConsent
        disableStyles={true}
        location="bottom"
        buttonText="Jeg godtar"
        buttonClasses="CookieConsent__button"
        contentClasses="CookieConstent__content"
        expires={150}
      >
        Denne siden bruker cookies for å forbedre brukeropplevelsen.{' '}
        {ctx.state.settings && ctx.state.settings.policy_page && (
          <>
            Les mer i vår{' '}
            <a href={'/' + ctx.state.settings.policy_page.slug}>
              {ctx.state.settings.policy_page.title}
            </a>
          </>
        )}
      </CookieConsent>
    </div>
  )
}

export default FooterActions
