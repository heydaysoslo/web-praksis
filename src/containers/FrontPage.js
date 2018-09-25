import React, { Component } from 'react'
import { getPosts } from '../utils/wp'
import Article from '../containers/Article'
import uuid from 'uuid/v1'
import cc from 'classcat'
import Loading from '../components/Loading'
import StickyPosts from '../components/StickyPosts'

class FrontPage extends Component {
  state = {
    posts: [],
    page: 1,
    loadingNext: false,
    allPagesLoaded: false,
    loading: true
  }

  componentDidMount = () => {
    getPosts(this.state.page).then(res => {
      this.setState({
        posts: res,
        loading: false
      })
    })
  }

  loadNextPage = () => {
    const nextPage = this.state.page + 1
    this.setState({ loadingNext: true })
    getPosts(nextPage)
      .then(res => {
        this.setState(prevState => {
          return {
            posts: [...prevState.posts, ...res],
            page: nextPage,
            loadingNext: false
          }
        })
      })
      .catch(err => {
        if (err && err.code && err.code === 'rest_post_invalid_page_number') {
          this.setState({
            allPagesLoaded: true
          })
        }
      })
  }

  render() {
    const { posts, loadingNext, allPagesLoaded, loading } = this.state
    if (loading) {
      return <Loading />
    }
    return (
      <article>
        <StickyPosts />
        <div className="Articles">
          {posts &&
            posts.map(p => (
              <div key={uuid('post')} className="Articles__item">
                <Article post={p} />
              </div>
            ))}
        </div>
        <div className="MoreArticles">
          {!allPagesLoaded && (
            <button
              className={cc({
                MoreArticles__button: true,
                button: true,
                'button--loading': loadingNext
              })}
              disabled={loadingNext}
              onClick={this.loadNextPage}
            >
              {loadingNext ? 'Laster innlegg' : 'Last flere innlegg'}
            </button>
          )}
          {allPagesLoaded && <div>Alle innlegg lastet</div>}
        </div>
      </article>
    )
  }
}

export default FrontPage
