import React, { Component } from 'react'
import { getPostsByCategory, getCategories } from '../utils/wp'
import Loading from '../components/Loading'
import Card from '../components/Card'
import Grid from '../components/primitives/Grid'
class Taxonomy extends Component {
  state = {
    cat: null,
    loading: true,
    posts: [],
    cats: [],
    catsLoaded: false,
  }

  setCurrentCat = (cats, slug) => {
    cats.forEach((cat) => {
      if (cat.slug === slug) {
        this.setState({ cat })
        getPostsByCategory(cat.id).then((posts) => {
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
    if (this.props.match.params.cat !== prevProps.match.params.cat) {
      this.loadContent()
    }
  }

  render() {
    const { cat, loading, posts, cats } = this.state
    return (
      <article>
        {loading ? (
          <Loading />
        ) : (
          <div className="container">
            {/* <h1>Kategori: {cat.name}</h1> */}
            {posts.length ? (
              <Grid
                gridGap={[4]}
                justifyContent={[null, 'center']}
                gridTemplateColumns={'repeat(auto-fit, minmax(25%, 1fr))'}
              >
                {posts.map((p) => (
                  <Card key={p.id} post={p} />
                ))}
              </Grid>
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
