import React, { Component } from 'react'
import Article from '../containers/Article'
import uuid from 'uuid/v1'
import cc from 'classcat'
import StickyPosts from '../components/StickyPosts'
import { Consumer } from '../components/utilities'

class FrontPage extends Component {
  render() {
    return (
      <Consumer>
        {ctx => (
          <article>
            <StickyPosts />
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
                  {ctx.state.loadingNext
                    ? 'Laster innlegg'
                    : 'Last flere innlegg'}
                </button>
              )}
              {ctx.state.allPagesLoaded && <div>Alle innlegg lastet</div>}
            </div>
          </article>
        )}
      </Consumer>
    )
  }
}

export default FrontPage
