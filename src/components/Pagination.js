import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { routes } from '../utils/routes'
import Box from './primitives/Box'

const StyledPageLink = styled(Link)(
  ({ theme }) => css`
    color: ${theme.color.red};
  `
)

const getPageLink = ({ cat, page }) => {
  const pageLinkObject = routes.filter((r) => r.name === 'CategoryPage')[0]
  const pageLink = pageLinkObject.path
    .replace(':cat', cat)
    .replace(':page', page)
  return pageLink
}

const StyledPagination = styled(Box)`
  display: flex;
  justify-content: space-between;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const PageLink = ({ cat, page, active, children, className, ...props }) => {
  if (active) {
    return <span className={className}>{children}</span>
  }
  const pageLink = getPageLink({ cat, page })
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

  return (
    <StyledPagination py={5}>
      <PageLink
        aria-label="Siste side"
        cat={cat.slug}
        page={firstPageNum}
        active={firstPageNum === page}
      >
        «
      </PageLink>
      <PageLink active={prevPageNum === page} cat={cat.slug} page={prevPageNum}>
        &larr; Nyere innlegg
      </PageLink>
      <ul>
        {Array.from(Array(totalPages).keys()).map((pageNum) => {
          const paged = pageNum + 1
          return (
            <li>
              <PageLink
                aria-label={`Side ${paged}`}
                key={`page-${pageNum}`}
                active={page === paged}
                cat={cat.slug}
                page={paged}
              >
                {paged}
              </PageLink>
            </li>
          )
        })}
      </ul>
      <PageLink active={nextPageNum === page} cat={cat.slug} page={nextPageNum}>
        Eldre innlegg &rarr;
      </PageLink>
      <PageLink
        aria-label="Siste side"
        cat={cat.slug}
        page={lastPageNum}
        active={lastPageNum === page}
      >
        »
      </PageLink>
    </StyledPagination>
  )
}

export default Pagination
