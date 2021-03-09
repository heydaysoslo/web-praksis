import React, { useContext } from 'react'
import SiteContext from '../components/utilities/Context'
import FeaturedPosts from '../components/FeaturedPosts'
import Layout from '../components/Layout'
import Heading from '../components/primitives/Heading'
import Container from '../components/primitives/Container'
import Box from '../components/primitives/Box'

const FrontPageNew = () => {
  const { state } = useContext(SiteContext)
  const { frontPage } = state
  return (
    <Layout
      page={{
        ...frontPage,
        pageTitle: frontPage && frontPage.title && frontPage.title.rendered,
      }}
    >
      <Box as="article" pb={5}>
        {frontPage && frontPage.acf.intro && (
          <Container as="header" my={[3, null, 5]}>
            <Heading size="h1" textAlign="center">
              {frontPage.acf.intro}
            </Heading>
          </Container>
        )}
        <FeaturedPosts postIds={frontPage?.acf?.featured_posts} />
      </Box>
    </Layout>
  )
}

export default FrontPageNew
