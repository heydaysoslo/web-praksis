import React from 'react'
import { getPostTerms } from '../utils/wp'
import Label from './primitives/Label'

const TaxonomyLabel = ({ post, taxonomy = 'category' }) => {
  const terms = getPostTerms(post, taxonomy)
  const term = (terms && terms[0]) || null
  if (!term) {
    return null
  }
  return <Label>{term.name}</Label>
}

export default TaxonomyLabel
