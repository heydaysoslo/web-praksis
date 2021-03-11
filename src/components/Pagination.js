import React from 'react'
import { Link } from 'react-router-dom'

import { getPaginatedCategoryLink } from '../utils/routes'
import { Number, PageLink } from './Pagination.styled'
import Flex from './primitives/Flex'
import Box from './primitives/Box'

const CategoryPageLink = ({
  slug,
  page,
  children,
  className,
  taxonomy,
  ...props
}) => {
  const pageLink = getPaginatedCategoryLink({ slug, page, taxonomy })
  return (
    <Link className={className} to={pageLink} {...props}>
      {children}
    </Link>
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
    <>
      <Flex
        flexWrap="wrap"
        as="nav"
        alignItems="center"
        justifyContent={['center', null, 'space-between']}
        aria-label="pagination"
        pt={2}
        pb={6}
        mt={6}
      >
        <Box width={{ xs: 1, lg: 'auto' }}>
          <Flex
            flexWrap="wrap"
            as="ul"
            m={[-1]}
            justifyContent={{ xs: 'center', lg: 'flex-end' }}
          >
            {Array.from(Array(totalPages).keys()).map((pageNum) => {
              const paged = pageNum + 1
              return (
                <Box m={1} as="li" key={`page-${paged}`}>
                  <Number
                    as={CategoryPageLink}
                    aria-label={`Side ${paged} av ${totalPages}`}
                    key={`page-${pageNum}`}
                    $active={page === paged}
                    slug={catSlug}
                    page={paged}
                    taxonomy={cat?.taxonomy}
                  >
                    {paged}
                  </Number>
                </Box>
              )
            })}
          </Flex>
        </Box>
        <Box mt={[3]} width={{ xs: 1, lg: 'auto' }}>
          <Flex mx={-2} justifyContent={{ xs: 'center', lg: 'flex-end' }}>
            <Box px={2}>
              <PageLink
                as={CategoryPageLink}
                rel="prev"
                $active={prevPageNum === page}
                slug={catSlug}
                page={prevPageNum}
                taxonomy={cat?.taxonomy}
              >
                &larr; Nyere innlegg
              </PageLink>
            </Box>
            <Box px={2}>
              <PageLink
                as={CategoryPageLink}
                rel="next"
                $active={nextPageNum === page}
                slug={catSlug}
                page={nextPageNum}
                taxonomy={cat?.taxonomy}
              >
                Eldre innlegg &rarr;
              </PageLink>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default Pagination
