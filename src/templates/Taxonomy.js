import React, { Component } from 'react'
import { getPostsByTaxonomy, getTerms, getPosts } from '../utils/wp'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import Box from '../components/primitives/Box'
import Container from '../components/primitives/Container'
import Layout from '../components/Layout'
import PostGrid from '../components/PostGrid'
import CategoryHeader from '../components/CategoryHeader'

class Taxonomy extends Component {
  state = {
    cat: null,
    loading: true,
    posts: [],
    cats: [],
    catsLoaded: false,
    page: 1,
    paging: null,
  }

  getCurrentCat = (slug) => {
    if (!slug) {
      return null
    }
    const foundCats = this.state.cats.filter((cat) => cat.slug === slug)
    return foundCats?.length ? foundCats[0] : null
  }

  setCurrentCat = (slug) => {
    const page = this.props.match.params.page || 1
    const cat = this.getCurrentCat(slug)
    this.setState({ page, cat })
    if (cat?.id) {
      getPostsByTaxonomy({
        taxonomy: this.props.taxonomy,
        ids: [cat.id],
        page,
      }).then((posts) => {
        this.setState({ posts, loading: false })
        if (posts._paging) {
          this.setState({ paging: posts._paging })
        }
      })
    } else {
      getPosts(page).then((posts) => {
        this.setState({ posts, loading: false })
        if (posts._paging) {
          this.setState({ paging: posts._paging })
        }
      })
    }
  }

  loadContent = () => {
    this.setState({ loading: true })
    const slug = this.props.match.params.cat
    if (this.state.catsLoaded) {
      this.setCurrentCat(slug)
    } else {
      getTerms({ taxonomy: this.props.taxonomy }).then((cats) => {
        this.setState({ cats, catsLoaded: true }, () => {
          this.setCurrentCat(slug)
        })
      })
    }
  }

  componentDidMount = () => {
    this.loadContent()
  }

  componentDidUpdate = (prevProps) => {
    if (
      this.props.match.params.cat !== prevProps.match.params.cat ||
      this.props.match.params.page !== prevProps.match.params.page
    ) {
      this.loadContent()
    }
  }

  getPageHeadings = (cat) => {
    // if (this.state.page !== 1) {
    //   return null
    // }
    if (cat?.name) {
      return {
        label: this.props.label,
        title: cat.name,
        intro: cat?.description,
      }
    }
    return {
      title: 'Arkiv',
    }
  }

  render() {
    const { cat, loading, posts } = this.state
    const pageHeadings = this.getPageHeadings(cat)
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
                <Box mt={4}>
                  <PostGrid posts={posts} />
                  <Pagination
                    page={parseInt(this.state.page)}
                    cat={cat}
                    posts={posts}
                    paging={this.state.paging}
                  />
                </Box>
              ) : (
                <div>
                  Fant ingen innlegg i kategorien <strong>{cat.name}</strong>
                </div>
              )}
            </Container>
          )}
        </article>
      </Layout>
    )
  }
}

export default Taxonomy
