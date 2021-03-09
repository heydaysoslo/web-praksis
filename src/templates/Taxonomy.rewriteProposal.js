/**
 *
 *
 *
 * HAS BUGS!!!
 * DO NOT USE UNTIL FIXED
 *
 *
 *
 *
 */

import React, { useState, useEffect } from 'react'
import { getPostsByTaxonomy, getTerms, getPosts } from '../utils/wp'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import Box from '../components/primitives/Box'
import Container from '../components/primitives/Container'
import Layout from '../components/Layout'
import PostGrid from '../components/PostGrid'
import CategoryHeader from '../components/CategoryHeader'

const Taxonomy = ({ match, taxonomy, label }) => {
  const [loading, setLoading] = useState(true)
  const [catsLoaded, setCatsLoaded] = useState(false)
  const [cat, setCat] = useState({})
  const [cats, setCats] = useState([])
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [paging, setPaging] = useState(null)

  const getCurrentCat = (slug) => {
    if (!slug) {
      return null
    }
    const foundCats = [...cats].filter((cat) => cat.slug === 'slug')
    return foundCats?.length ? foundCats[0] : null
  }

  const gotPosts = (posts) => {
    setLoading(false)
    setPosts(posts)
    if (posts._paging) {
      setPaging(posts._paging)
    }
  }

  const setCurrentCat = (slug) => {
    const page = match?.params?.page || 1
    const cat = getCurrentCat(slug)
    setCat(cat)
    setPage(page)
    if (cat?.id) {
      getPostsByTaxonomy({
        taxonomy,
        ids: [cat.id],
        page,
      }).then(gotPosts)
    } else {
      getPosts(page).then(gotPosts)
    }
  }

  const loadContent = () => {
    setLoading(true)
    const slug = match?.params?.cat
    console.log('loadContent', slug, catsLoaded)
    if (catsLoaded) {
      setCurrentCat(slug)
    } else {
      getTerms({ taxonomy }).then((cats) => {
        setCats(cats)
        setCatsLoaded(true)
      })
    }
  }

  useEffect(() => {
    if (catsLoaded) {
      const slug = match?.params?.cat
      setCurrentCat(slug)
    }
  }, [catsLoaded])

  useEffect(loadContent, [match?.params?.cat, match?.params?.page])

  const getPageHeadings = (cat) => {
    if (cat?.name) {
      return {
        label,
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
          (cat && cat?.name && `${pageHeadings?.label}: ${cat?.name}`) ||
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
              <Box mt={4}>
                <PostGrid posts={posts} />
                <Pagination
                  page={parseInt(page)}
                  cat={cat}
                  posts={posts}
                  paging={paging}
                />
              </Box>
            ) : (
              <div>
                Fant ingen innlegg i kategorien <strong>{cat?.name}</strong>
              </div>
            )}
          </Container>
        )}
      </article>
    </Layout>
  )
}

export default Taxonomy
