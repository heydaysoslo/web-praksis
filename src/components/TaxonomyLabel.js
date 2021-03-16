import React from 'react'
import { getPostTerms } from '../utils/wp'
import Label from './primitives/Label'

const TaxonomyLabel = ({ post, taxonomy = 'category', ...props }) => {
  const terms = getPostTerms(post, taxonomy)
  const term = (terms && terms[0]) || null
  if (!term) {
    return null
  }
  return <Label {...props}>{term.name}</Label>
}

export default TaxonomyLabel
