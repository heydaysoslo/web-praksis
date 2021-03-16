import React, { useEffect, useState } from 'react'
import FeaturedPosts from '../components/FeaturedPosts'
import Layout from '../components/Layout'
import Heading from '../components/primitives/Heading'
import Container from '../components/primitives/Container'
import Box from '../components/primitives/Box'
import SpecialPosts from '../components/SpecialPosts'
import { getFrontPage } from '../utils/wp'
import NewsTicker from '../components/NewsTicker'
import Pagebuilder from '../components/Pagebuilder'

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
      <Box as="article">
        {page && page.acf.intro && (
          <Container as="header" my={[3, null, 4, 5]}>
            <Heading size="h1" textAlign="center">
              {page.acf.intro}
            </Heading>
          </Container>
        )}
        <Container>
          <NewsTicker />
        </Container>
        <Box mt={[4, null, null, 5]}>
          <FeaturedPosts postIds={page?.acf?.featured_posts} />
        </Box>
        {page?.acf?.blocks && (
          <Pagebuilder my={[5, null, null, 6]} blocks={page.acf.blocks} />
        )}
        <SpecialPosts my={[5, null, null, 6]} />
      </Box>
    </Layout>
  )
}

export default FrontPageNew
