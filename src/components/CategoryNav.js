import React, { useEffect, useState } from 'react'
import { getCategories } from '../utils/wp'
import CategoryNavStyled, { Wrap, Nav, Items } from './CategoryNav.styled'
import CategoryNavItem from './CategoryNavItem'
import Box from './primitives/Box'

const CategoryNav = ({ categories = [] }) => {
  const [cats, setCats] = useState(categories)

  const getCats = () => {
    if (cats.length) {
      return
    }
    getCategories().then((res) => {
      setCats(res)
    })
  }

  useEffect(getCats, [])

  if (!cats?.length) {
    return null
  }

  return (
    <CategoryNavStyled mt={2}>
      <Wrap>
        <Nav as="nav">
          <Items
            as="ul"
            mx={[-2]}
            flexWrap="nowrap"
            justifyContent="center"
            minWidth="100%"
          >
            {cats.map((cat) => {
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
    </CategoryNavStyled>
  )
}

export default CategoryNav
