import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { getPaginatedCategoryLink } from '../utils/routes'
import Box from './primitives/Box'

const StyledPageLink = styled(Link)(
  ({ theme, $active }) => css`
    color: ${theme.colors.red};
    padding-left: 15px;
    padding-right: 15px;
  `
)

const StyledPagination = styled(Box)`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid black;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const PaginationNumbers = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

const CategoryPageLink = ({
  slug,
  page,
  active,
  children,
  className,
  ...props
}) => {
  const pageLink = getPaginatedCategoryLink({ slug, page })
  return (
    <StyledPageLink className={className} to={pageLink} {...props}>
      {children}
    </StyledPageLink>
  )
}

const Pagination = ({ posts, page, cat, paging }) => {
  // If there are more pages, the wp json request returns a _paging object on the posts array
  if (!paging) {
    return null
  }

  const { totalPages } = paging
  // const firstPageNum = 1
  // const lastPageNum = totalPages
  const nextPageNum =
    page >= parseInt(totalPages) ? parseInt(totalPages) : page + 1
  const prevPageNum = page <= 1 ? 1 : page - 1
  const catSlug = cat?.slug || false

  return (
    <StyledPagination as="nav" aria-label="pagination" pt={2} pb={5} mt={5}>
      <PaginationNumbers as="ul">
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
      </PaginationNumbers>
      <div>
        <CategoryPageLink
          rel="prev"
          active={prevPageNum === page}
          slug={catSlug}
          page={prevPageNum}
        >
          &larr; Nyere innlegg
        </CategoryPageLink>
        <CategoryPageLink
          rel="next"
          active={nextPageNum === page}
          slug={catSlug}
          page={nextPageNum}
        >
          Eldre innlegg &rarr;
        </CategoryPageLink>
      </div>
      {/* <CategoryPageLink
        aria-label="Første side"
        slug={catSlug}
        page={firstPageNum}
        active={firstPageNum === page}
      >
        «
      </CategoryPageLink> */}
      {/* <CategoryPageLink
        aria-label="Siste side"
        slug={catSlug}
        page={lastPageNum}
        active={lastPageNum === page}
      >
        »
      </CategoryPageLink> */}
    </StyledPagination>
  )
}

export default Pagination
