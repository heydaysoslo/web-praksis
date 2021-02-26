import React, { Component } from 'react'
import { getPostsByCategory, getCategories, getPosts } from '../utils/wp'
import Loading from '../components/Loading'
import Card from '../components/Card'
import Grid from '../components/primitives/Grid'
import Pagination from '../components/Pagination'
import Box from '../components/primitives/Box'
import Layout from '../components/Layout'

class Taxonomy extends Component {
  state = {
    cat: null,
    loading: true,
    posts: [],
    cats: [],
    catsLoaded: false,
    page: 1,
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
      getPostsByCategory(cat.id, page).then((posts) => {
        this.setState({ posts, loading: false })
      })
    } else {
      getPosts(page).then((posts) => {
        this.setState({ posts, loading: false })
      })
    }
  }

  loadContent = () => {
    this.setState({ loading: true })
    const slug = this.props.match.params.cat
    if (this.state.catsLoaded) {
      this.setCurrentCat(slug)
    } else {
      getCategories().then((cats) => {
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

  render() {
    const { cat, loading, posts } = this.state
    return (
      <Layout
        page={{
          ...cat,
          pageTitle: (cat && cat.name && `Kategori: ${cat.name}`) || 'Arkiv',
        }}
      >
        <article>
          {loading ? (
            <Loading />
          ) : (
            <div className="container">
              {posts.length ? (
                <Box mt={5}>
                  <Grid
                    gridGap={[4]}
                    justifyContent={[null, 'center']}
                    gridTemplateColumns={'repeat(4, 1fr)'}
                  >
                    {posts.map((p) => (
                      <Card key={`post-item-${p.id}`} post={p} />
                    ))}
                  </Grid>
                  <Pagination
                    page={parseInt(this.state.page)}
                    cat={cat}
                    posts={posts}
                  />
                </Box>
              ) : (
                <div>
                  Fant ingen innlegg i kategorien <strong>{cat.name}</strong>
                </div>
              )}
            </div>
          )}
        </article>
      </Layout>
    )
  }
}

export default Taxonomy
