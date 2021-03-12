import React, { useEffect, useState } from 'react'
import FeaturedPosts from '../components/FeaturedPosts'
import Layout from '../components/Layout'
import Heading from '../components/primitives/Heading'
import Container from '../components/primitives/Container'
import Box from '../components/primitives/Box'
import SpecialPosts from '../components/SpecialPosts'
import { getFrontPage } from '../utils/wp'

const FrontPageNew = () => {
  const [page, setPage] = useState()
  const onMount = () => {
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
      <Box as="article" pb={5}>
        {page && page.acf.intro && (
          <Container as="header" my={[3, null, 5]}>
            <Heading size="h1" textAlign="center">
              {page.acf.intro}
            </Heading>
          </Container>
        )}
        <FeaturedPosts postIds={page?.acf?.featured_posts} />
      </Box>
      <SpecialPosts />
    </Layout>
  )
}

export default FrontPageNew
