import React, { Component } from 'react'
import { getPosts } from '../utils/wp'
import Article from '../containers/Article'

class FrontPage extends Component {
  state = {
    posts: [],
    page: 1
  }
  componentDidMount = () => {
    getPosts(this.state.page).then(res => {
      this.setState({
        posts: res
      })
    })
  }
  loadNextPage = () => {
    const nextPage = this.state.page + 1
    getPosts(nextPage).then(res => {
      this.setState(prevState => {
        return {
          posts: [...prevState.posts, ...res],
          page: nextPage
        }
      })
    })
  }
  render() {
    const { posts } = this.state
    return (
      <article>
        <section className="Articles">
          {posts &&
            posts.map(p => (
              <div className="Articles__item">
                <Article key={p.id} post={p} />
              </div>
            ))}
        </section>
        <button onClick={this.loadNextPage}>Load next page</button>
      </article>
    )
  }
}

export default FrontPage
