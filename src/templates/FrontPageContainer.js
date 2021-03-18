import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getFrontPage } from '../utils/wp'
import FrontPageNew from './FrontPageNew'

const FrontPageContainer = () => {
  const [page, setPage] = useState()

  const onMount = () => {
    window.scrollTo(0, 0)
    getFrontPage().then((res) => {
      setPage(res)
    })
  }

  useEffect(onMount, [])

  return (
    <Layout
      page={{
        ...page,
        pageTitle: page && page.title && page.title.rendered,
      }}
    >
      <FrontPageNew page={page} />
    </Layout>
  )
}

export default FrontPageContainer
