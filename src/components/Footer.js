import React, { useContext } from 'react'
import Flex from './primitives/Flex'
import Box from './primitives/Box'
import Stack from './primitives/Stack'
import Text from './primitives/Text'
import Container from './primitives/Container'
import SiteContext from './utilities/Context'
import StyledLink from './primitives/Link'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'

const Footer = () => {
  const ctx = useContext(SiteContext)
  const acfOptions = ctx?.state?.settings?.acf_options
  const primaryItems = ctx?.state?.menuItems || []
  const secondaryItems = ctx?.state?.secondaryItems || []
  return (
    <Box as="footer" mt={[4]} pb={{ xs: 4, md: 5, lg: 6 }}>
      <Container>
        <Box borderTop={[1]} />
        <Flex
          flexWrap="wrap"
          pt={{ xs: 3, md: 4, lg: 5 }}
          mx={[-3]}
          justifyContent="space-between"
        >
          <Box px={3} width={{ xs: 1, md: 1 / 2 }}>
            {acfOptions?.footer_tagline && (
              <Text size="md">{acfOptions.footer_tagline}</Text>
            )}
            {acfOptions?.footer_address && (
              <Text size="small" mt={{ xs: 3, md: 4 }}>
                {ReactHtmlParser(acfOptions.footer_address)}
              </Text>
            )}
          </Box>
          <Box
            mt={{ xs: 3, md: 0 }}
            px={3}
            width={{ xs: 1, md: 1 / 2, lg: 1 / 4 }}
          >
            <Stack as="nav">
              {[...primaryItems, ...secondaryItems].map((item) => {
                return (
                  <div key={`footerNav${item.ID}`}>
                    <StyledLink as={Link} to={item.url}>
                      {item.title}
                    </StyledLink>
                  </div>
                )
              })}
            </Stack>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
