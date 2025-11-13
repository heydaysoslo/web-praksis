import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getPostsByTaxonomy, getTerms, getPosts } from '../utils/wp'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import Box from '../components/primitives/Box'
import Container from '../components/primitives/Container'
import Layout from '../components/Layout'
import PostGrid from '../components/PostGrid'
import CategoryHeader from '../components/CategoryHeader'
import Text from '../components/primitives/Text'

const Taxonomy = ({ taxonomy, label }) => {
  const params = useParams()
  const [cat, setCat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [cats, setCats] = useState([])
  const [catsLoaded, setCatsLoaded] = useState(false)
  const [page, setPage] = useState(1)
  const [paging, setPaging] = useState(null)

  const getCurrentCat = useCallback((slug, catsList) => {
    if (!slug) {
      return null
    }
    const foundCats = catsList.filter((cat) => cat.slug === slug)
    return foundCats?.length ? foundCats[0] : null
  }, [])

  const setCurrentCat = useCallback((slug, catsList, currentPage) => {
    const currentCat = getCurrentCat(slug, catsList)
    setPage(currentPage)
    setCat(currentCat)
    if (currentCat?.id) {
      getPostsByTaxonomy({
        taxonomy: taxonomy,
        ids: [currentCat.id],
        page: currentPage,
      }).then((posts) => {
        setPosts(posts)
        setLoading(false)
        if (posts._paging) {
          setPaging(posts._paging)
        }
      })
    } else {
      getPosts(currentPage).then((posts) => {
        setPosts(posts)
        setLoading(false)
        if (posts._paging) {
          setPaging(posts._paging)
        }
      })
    }
  }, [taxonomy, getCurrentCat])

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    const slug = params.cat
    const currentPage = params.page || 1
    
    if (catsLoaded) {
      setCurrentCat(slug, cats, currentPage)
    } else {
      getTerms({ taxonomy: taxonomy }).then((catsData) => {
        setCats(catsData)
        setCatsLoaded(true)
        setCurrentCat(slug, catsData, currentPage)
      })
    }
  }, [params.cat, params.page, taxonomy])

  const getPageHeadings = (cat) => {
    // if (page !== 1) {
    //   return null
    // }
    if (cat?.name) {
      return {
        label: label,
        title: cat.name,
        intro: cat?.description,
      }
    }
    return {
      title: 'Arkiv',
    }
  }

  const pageHeadings = getPageHeadings(cat)
  return (
    <Layout
      page={{
        ...cat,
        pageTitle:
          (cat && cat.name && `${pageHeadings?.label}: ${cat.name}`) ||
          'Arkiv',
      }}
    >
      <article>
        {loading ? (
          <Loading />
        ) : (
          <Container>
            <CategoryHeader
              label={pageHeadings?.label}
              title={pageHeadings?.title}
              intro={pageHeadings?.intro}
            />
            {posts.length ? (
              <>
                <PostGrid mt={{ xs: 4, md: 5 }} posts={posts} />
                <Pagination
                  page={parseInt(page)}
                  cat={cat}
                  posts={posts}
                  paging={paging}
                />
              </>
            ) : (
              <Box mt={{ xs: 4, md: 5, lg: 6 }} textAlign="center">
                <Text>Fant ingen innlegg</Text>
              </Box>
            )}
          </Container>
        )}
      </article>
    </Layout>
  )
}

export default Taxonomy
