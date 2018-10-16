import React, { Component } from 'react'
import Article from '../containers/Article'
import uuid from 'uuid/v1'
import cc from 'classcat'
import PostCarousel from '../components/PostCarousel'
import { Consumer, HeaderMeta } from '../components/utilities'
import { getScrollPosition, getDocumentHeight } from '../utils/functions'
import { getPageById } from '../utils/wp'

class FrontPage extends Component {
  state = {
    loaded: false,
    page: null
  }

  loadFrontPageContent = () => {
    if (
      this.props.ctx.state.settings &&
      this.props.ctx.state.settings.front_page_id
    ) {
      console.log('load frontpage content')
      getPageById(this.props.ctx.state.settings.front_page_id).then(page => {
        this.setState({
          page
        })
      })
    }
  }

  componentDidMount = () => {
    const { feedScrollPos } = this.props.ctx.state
    if (feedScrollPos.y && getDocumentHeight() > feedScrollPos.y) {
      window.scrollTo(0, feedScrollPos.y)
    }
    this.loadFrontPageContent()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.ctx.state.settings !== prevProps.ctx.state.settings) {
      this.loadFrontPageContent()
    }
  }

  componentWillUnmount = () => {
    this.props.ctx.state.feedScrollPos = getScrollPosition()
  }

  render() {
    const { ctx } = this.props
    const { page } = this.state
    return (
      <article className="FrontPage">
        {page ? <HeaderMeta data={page} /> : <HeaderMeta />}
        {page &&
          page.acf.intro && (
            <div className="container">
              <h1 className="FrontPage__intro">{page.acf.intro}</h1>
            </div>
          )}
        {page &&
          page.acf &&
          page.acf.featured_posts && (
            <PostCarousel posts={page.acf.featured_posts} />
          )}
        <div className="Articles">
          {ctx.state.posts &&
            ctx.state.posts.map(p => (
              <div key={uuid('post')} className="Articles__item">
                <Article post={p} />
              </div>
            ))}
        </div>
        {ctx.state.initialLoad && (
          <div className="MoreArticles">
            {!ctx.state.allPagesLoaded && (
              <button
                className={cc({
                  MoreArticles__button: true,
                  button: true,
                  'button--loading': ctx.state.loadingNext
                })}
                disabled={ctx.state.loadingNext}
                onClick={ctx.actions.nextPage}
              >
                {ctx.state.loadingNext
                  ? 'Laster innlegg'
                  : 'Last flere innlegg'}
              </button>
            )}
            {ctx.state.allPagesLoaded && (
              <div className="MoreArticles__button MoreArticles__button--loaded">
                Alle innlegg lastet
              </div>
            )}
          </div>
        )}
      </article>
    )
  }
}

export default props => <Consumer>{ctx => <FrontPage ctx={ctx} />}</Consumer>
