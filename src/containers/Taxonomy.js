import React, { Component } from 'react'
import { getPostsByCategory, getCategories } from '../utils/wp'
import Loading from '../components/Loading'
import Card from '../components/Card'
import Grid from '../components/primitives/Grid'
import Pagination from '../components/Pagination'
import Box from '../components/primitives/Box'
class Taxonomy extends Component {
  state = {
    cat: null,
    loading: true,
    posts: [],
    cats: [],
    catsLoaded: false,
    page: 1,
  }

  setCurrentCat = (cats, slug) => {
    const page = this.props.match.params.page || 1
    this.setState({ page })
    cats.forEach((cat) => {
      if (cat.slug === slug) {
        this.setState({ cat })
        getPostsByCategory(cat.id, page).then((posts) => {
          this.setState({ posts, loading: false })
        })
      }
    })
  }

  loadContent = () => {
    this.setState({ loading: true })
    const slug = this.props.match.params.cat

    if (this.state.catsLoaded) {
      this.setCurrentCat(this.state.cats, slug)
    } else {
      getCategories().then((cats) => {
        this.setState({ cats, catsLoaded: true })
        this.setCurrentCat(cats, slug)
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
                  gridTemplateColumns={'repeat(auto-fit, minmax(320px, 1fr))'}
                >
                  {posts.map((p) => (
                    <Card key={p.id} post={p} />
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
    )
  }
}

export default Taxonomy
