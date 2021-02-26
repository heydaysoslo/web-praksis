import React, { useContext } from 'react'
import SiteContext from './utilities/Context'
import SvgFlame from './SvgFlame'

const Footer = () => {
  const ctx = useContext(SiteContext)
  return (
    <footer className="AppFooter">
      <div className="AppFooter__content">
        <div className="AppFooter__left">
          {ctx.state.settings && ctx.state.settings.policy_page && (
            <a href={'/' + ctx.state.settings.policy_page.slug}>
              {ctx.state.settings.policy_page.title}
            </a>
          )}
        </div>
        <div className="AppFooter__right">
          Magasinet for unge sosialdemokrater fra{' '}
          <a target="_blank" rel="noopener noreferrer" href="http://auf.no">
            AUF <SvgFlame />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
