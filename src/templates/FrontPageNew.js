import React from 'react'
import NewsTicker from '../components/NewsTicker'
import Pagebuilder from '../components/Pagebuilder'
import NewsletterForm from '../components/NewsletterForm'
import Heading from '../components/primitives/Heading'
import Container from '../components/primitives/Container'
import Box from '../components/primitives/Box'
import SpecialPosts from '../components/SpecialPosts'
import FeaturedPosts from '../components/FeaturedPosts'
import PreviewWarning from '../components/PreviewWarning'

const FrontPageNew = ({ page, preview }) => {
  return (
    <>
      <Box as="article">
        {preview && <PreviewWarning />}
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
      <Container mb={6}>
        <Heading as="h3" size="h2" textAlign="center" mb="3">
          Meld deg på vårt nyhetsbrev
        </Heading>
        <NewsletterForm />
      </Container>
    </>
  )
}

export default FrontPageNew
