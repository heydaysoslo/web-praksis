import React, { Component } from 'react'
import Post from '../components/Post'
import { getCategoryBySlug, getPostsByCategory } from '../utils/wp'
import Loading from '../components/Loading'

class Taxonomy extends Component {
  state = {
    cat: null,
    loading: true,
    posts: []
  }

  componentDidMount = () => {
    getCategoryBySlug(this.props.match.params.cat).then(cat => {
      this.setState({ cat })
      getPostsByCategory(this.props.id).then(posts => {
        this.setState({ posts, loading: false })
      })
    })
  }

  render() {
    const { cat, loading, posts } = this.state
    if (loading) {
      return <Loading />
    }
    return (
      <div>
        <h1>{cat.name}</h1>
        <div>{posts && posts.map(p => <Post key={p.id} post={p} />)}</div>
      </div>
    )
  }
}

export default Taxonomy
