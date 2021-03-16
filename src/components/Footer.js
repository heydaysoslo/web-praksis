import React, { useContext } from 'react'
import Flex from './primitives/Flex'
import Box from './primitives/Box'
import Stack from './primitives/Stack'
import Text from './primitives/Text'
import Container from './primitives/Container'
import SiteContext from './utilities/Context'
import StyledLink from './primitives/Link'
import { Link } from 'react-router-dom'

const Footer = () => {
  const ctx = useContext(SiteContext)
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
            <Text size="md">
              Praksis er medlemsmagasinet til AUF. Her kan du bli kjent med AUF
              og AUFerne våre.
            </Text>
            <Text size="small" mt={{ xs: 3, md: 4 }}>
              <p>
                Arbeidernes Ungdomsfylking
                <br />
                Postboks 8863,
                <br />
                Youngstorget
              </p>
            </Text>
          </Box>
          <Box
            mt={{ xs: 3, md: 0 }}
            px={3}
            width={{ xs: 1, md: 1 / 2, lg: 1 / 4 }}
          >
            <Stack as="nav">
              {[
                { id: 'home', title: 'Forsiden', url: '/' },
                ...primaryItems,
                ...secondaryItems,
              ].map((item) => {
                return (
                  <div key={item.id}>
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
