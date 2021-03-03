import React, { Component } from 'react'
import { getPostsByCategory, getCategories, getPosts } from '../utils/wp'
import Loading from '../components/Loading'
import Card from '../components/Card'
import Pagination from '../components/Pagination'
import Box from '../components/primitives/Box'
import Flex from '../components/primitives/Flex'
import Container from '../components/primitives/Container'
import Layout from '../components/Layout'
import Heading from '../components/primitives/Heading'
import Label from '../components/primitives/Label'

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
      getPostsByCategory(cat.id, page).then((posts) => {
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
            <Container>
              {this.state.page === 1 && cat?.name && (
                <Box textAlign={{ xs: 'left', lg: 'center' }} mt={4}>
                  <Label>Kategori</Label>
                  <Heading mt={[1]} size="h1" as="h1">
                    {cat.name}
                  </Heading>
                  {cat.description && <Text>{cat.description}</Text>}
                </Box>
              )}
              {posts.length ? (
                <Box mt={4}>
                  <Flex flexWrap="wrap" mx={-3}>
                    {posts.map((p) => (
                      <Box
                        key={`post-item-${p.id}`}
                        width={[1, 1, 1 / 2, 1 / 2, 1 / 3, 1 / 4]}
                        px={[3]}
                        pb={[4]}
                      >
                        <Card post={p} />
                      </Box>
                    ))}
                  </Flex>
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
