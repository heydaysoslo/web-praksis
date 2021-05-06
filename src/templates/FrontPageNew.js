import React from 'react'
import NewsTicker from '../components/NewsTicker'
import Pagebuilder from '../components/Pagebuilder'
import Heading from '../components/primitives/Heading'
import Container from '../components/primitives/Container'
import Box from '../components/primitives/Box'
import SpecialPosts from '../components/SpecialPosts'
import FeaturedPosts from '../components/FeaturedPosts'
import PreviewWarning from '../components/PreviewWarning'

const FrontPageNew = ({ page, preview }) => {
  return (
    <Box as="article">
      {preview && <PreviewWarning />}
      {page && page.acf.intro && (
        <Container as="header" my={[3, null, 4, 5]}>
          <Heading size="h1" textAlign="center">
            {page.acf.intro}
          </Heading>
        </Container>
      )}
      <Container mt={[3, null, 4]}>
        <NewsTicker />
      </Container>
      <Box mt={[4, null, null, 4]}>
        <FeaturedPosts
          postIds={page?.acf?.featured_posts}
          randomize={page?.acf?.featured_posts_randomize}
        />
      </Box>
      {page?.acf?.blocks && (
        <Pagebuilder my={[5, null, null, 6]} blocks={page.acf.blocks} />
      )}
      <SpecialPosts my={[5, null, null, 6]} />
    </Box>
  )
}

export default FrontPageNew
