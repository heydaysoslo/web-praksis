import React from 'react'
import Container from './primitives/Container'
import Heading from './primitives/Heading'
import NewsletterForm from './NewsletterForm'
import WpTheContent from './WpTheContent'
import Box from './primitives/Box'

const NewsletterBlock = ({ title, intro }) => {
  return (
    <Container mt={[3, null, 4]} size="narrow" textAlign="center">
      {title && (
        <Heading as="h3" size="h2">
          {title}
        </Heading>
      )}
      {intro && (
        <Container size="narrow" mt={[3]}>
          <WpTheContent content={intro} />
        </Container>
      )}
      <Box mt={[3]}>
        <NewsletterForm />
      </Box>
    </Container>
  )
}

export default NewsletterBlock
