import React, { Component } from 'react'
import Article from '../containers/Article'
import uuid from 'uuid/v1'
import cc from 'classcat'
// import StickyPosts from '../components/StickyPosts'
import { Consumer } from '../components/utilities'
import { getScrollPosition, getDocumentHeight } from '../utils/functions'

class FrontPage extends Component {
  componentDidMount = () => {
    /**
     * Return to same scroll position as you left
     * TODO: Change this to return to same article instead
     */
    const { feedScrollPos } = this.props.ctx.state
    if (feedScrollPos.y && getDocumentHeight() > feedScrollPos.y) {
      window.scrollTo(0, feedScrollPos.y)
    }
  }

  componentWillUnmount = () => {
    this.props.ctx.state.feedScrollPos = getScrollPosition()
  }

  render() {
    const { ctx } = this.props
    return (
      <article>
        {/* <StickyPosts /> */}
        <div className="Articles">
          {ctx.state.posts &&
            ctx.state.posts.map(p => (
              <div key={uuid('post')} className="Articles__item">
                <Article post={p} />
              </div>
            ))}
        </div>
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
              {ctx.state.loadingNext ? 'Laster innlegg' : 'Last flere innlegg'}
            </button>
          )}
          {ctx.state.allPagesLoaded && (
            <div className="MoreArticles__button MoreArticles__button--loaded">
              Alle innlegg lastet
            </div>
          )}
        </div>
      </article>
    )
  }
}

export default props => <Consumer>{ctx => <FrontPage ctx={ctx} />}</Consumer>
