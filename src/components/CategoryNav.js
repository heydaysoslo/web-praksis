import React from 'react'
import { Wrap, Nav, Items } from './CategoryNav.styled'
import CategoryNavItem from './CategoryNavItem'
import Box from './primitives/Box'
import Container from './primitives/Container'

const CategoryNav = ({ categories }) => {
  if (!categories) {
    return null
  }

  return (
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
            {categories.map((cat) => {
              return (
                <Box as="li" mx={[2]} key={`catNavItem-${cat.id}`}>
                  <CategoryNavItem cat={cat} />
                </Box>
              )
            })}
            <Box mx={[2]}>
              <CategoryNavItem cat={null}>Arkiv</CategoryNavItem>
            </Box>
          </Items>
        </Nav>
      </Wrap>
    </Box>
  )
}

export default CategoryNav
