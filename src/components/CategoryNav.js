import React from 'react'
import { Wrap, Nav, Items } from './CategoryNav.styled'
import CategoryNavItem from './CategoryNavItem'
import Box from './primitives/Box'

const CategoryNav = ({ categories }) => {
  if (!categories) {
    return null
  }

  // Extract the podcast item
  const catsClone = [...categories]
  const podcastItemIndex = catsClone
    .map(function (c) {
      return c.slug.indexOf('podcast') !== -1 && 'podcast'
    })
    .indexOf('podcast')
  const podcastItem = catsClone.splice(podcastItemIndex, 1)

  return (
    <>
      <Box mt={2}>
        <Wrap>
          <Nav as="nav">
            <Items
              as="ul"
              mx={[-2]}
              flexWrap="nowrap"
              justifyContent="center"
              minWidth="100%"
            >
              {catsClone.map((cat) => {
                return (
                  <Box as="li" mx={[2]} key={`catNavItem-${cat.id}`}>
                    <CategoryNavItem cat={cat} />
                  </Box>
                )
              })}
              <Box mx={[2]}>
                <CategoryNavItem cat={null}>Arkiv</CategoryNavItem>
              </Box>
              {podcastItem && podcastItem[0] && (
                <Box mx={[2]}>
                  <CategoryNavItem variant="pill" cat={podcastItem[0]} />
                </Box>
              )}
            </Items>
          </Nav>
        </Wrap>
      </Box>
    </>
  )
}

export default CategoryNav
