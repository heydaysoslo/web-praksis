import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { getPaginatedCategoryLink } from '../utils/routes'
import Box from './primitives/Box'

const StyledPageLink = styled(Link)(
  ({ theme }) => css`
    color: ${theme.colors.red};
  `
)

const StyledPagination = styled(Box)`
  display: flex;
  justify-content: space-between;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const CategoryPageLink = ({
  slug,
  page,
  active,
  children,
  className,
  ...props
}) => {
  if (active) {
    return <span className={className}>{children}</span>
  }
  const pageLink = getPaginatedCategoryLink({ slug, page })
  return (
    <StyledPageLink className={className} to={pageLink} {...props}>
      {children}
    </StyledPageLink>
  )
}

const Pagination = ({ posts, page, cat }) => {
  // If there are more pages, the wp json request returns a _paging object on the posts array
  if (!posts?._paging) {
    return null
  }

  const { totalPages } = posts._paging
  const firstPageNum = 1
  const lastPageNum = totalPages
  const nextPageNum =
    page >= parseInt(totalPages) ? parseInt(totalPages) : page + 1
  const prevPageNum = page <= 1 ? 1 : page - 1
  const catSlug = cat?.slug || false

  return (
    <StyledPagination py={5}>
      <CategoryPageLink
        aria-label="Siste side"
        slug={catSlug}
        page={firstPageNum}
        active={firstPageNum === page}
      >
        «
      </CategoryPageLink>
      <CategoryPageLink
        active={prevPageNum === page}
        slug={catSlug}
        page={prevPageNum}
      >
        &larr; Nyere innlegg
      </CategoryPageLink>
      <ul>
        {Array.from(Array(totalPages).keys()).map((pageNum) => {
          const paged = pageNum + 1
          return (
            <li key={`page-${paged}`}>
              <CategoryPageLink
                aria-label={`Side ${paged}`}
                key={`page-${pageNum}`}
                active={page === paged}
                slug={catSlug}
                page={paged}
              >
                {paged}
              </CategoryPageLink>
            </li>
          )
        })}
      </ul>
      <CategoryPageLink
        active={nextPageNum === page}
        slug={catSlug}
        page={nextPageNum}
      >
        Eldre innlegg &rarr;
      </CategoryPageLink>
      <CategoryPageLink
        aria-label="Siste side"
        slug={catSlug}
        page={lastPageNum}
        active={lastPageNum === page}
      >
        »
      </CategoryPageLink>
    </StyledPagination>
  )
}

export default Pagination
