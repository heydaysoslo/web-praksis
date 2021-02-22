import React, { useEffect, useState } from 'react'

import { getCategories } from '../utils/wp'

import Container from './Container'
import CategoryNavStyled from './CategoryNav.styled'
import CategoryNavItem from './CategoryNavItem'
import Grid from './primitives/Grid'
import Heading from './primitives/Heading'

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
    <CategoryNavStyled>
      <Container>
        <Grid
          gridGap={[3]}
          justifyContent={[null, 'center']}
          gridAutoFlow={[null, 'column']}
        >
          {cats.map((cat) => {
            return <CategoryNavItem key={`catNavItem-${cat.id}`} cat={cat} />
          })}
        </Grid>
      </Container>
    </CategoryNavStyled>
  )
}

export default CategoryNav
