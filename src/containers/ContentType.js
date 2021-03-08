import React, { Component } from 'react'
import { getContentTypes, getPostsByTaxonomy } from '../utils/wp'
import Loading from '../components/Loading'
import { NavLink } from 'react-router-dom'
import uuid from 'uuid/v1'
import PostGrid from '../components/PostGrid'

class ContentType extends Component {
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
        getPostsByTaxonomy('content_type', [cat.id]).then((posts) => {
          this.setState({ posts, loading: false })
        })
      }
    })
  }

  loadContent = () => {
    const slug = this.props.match.params.cat

    if (this.state.catsLoaded) {
      this.setCurrentCat(this.state.cats, slug)
    } else {
      getContentTypes()
        .then((cats) => {
          this.setState({ cats, catsLoaded: true })
          this.setCurrentCat(cats, slug)
        })
        .catch((err) => console.log('err', err))
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
    if (loading) {
      return <Loading />
    }
    return (
      <article className="container">
        <h1>{cat.name}</h1>
        {cats && (
          <ul className="Terms">
            {cats.map((c) => {
              return (
                <NavLink
                  className="Terms__item"
                  activeClassName="Terms__item--active"
                  key={uuid()}
                  to={c.link}
                >
                  {c.name}
                </NavLink>
              )
            })}
          </ul>
        )}
        {posts.length ? (
          <PostGrid posts={posts} />
        ) : (
          <div>
            Fant ingen innlegg i kategorien <strong>{cat.name}</strong>
          </div>
        )}
      </article>
    )
  }
}

export default ContentType
