import React from 'react'
import SEO from './SEO'

const Layout = ({ page, children }) => {
  return (
    <>
      <SEO page={page} />
      <div>{children}</div>
    </>
  )
}

export default Layout
