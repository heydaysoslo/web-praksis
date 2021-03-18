import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import Loading from '../components/Loading'
import { getPreview, getSettings } from '../utils/wp'
import Article from './ArticleNew'
import FrontPageNew from './FrontPageNew'

class Preview extends Component {
  state = {
    post: false,
    frontPageId: null,
  }

  componentDidMount() {
    return getSettings().then((settings) => {
      this.setState({ frontPageId: settings.front_page_id })
      return getPreview({ ...this.props.match.params })
        .then((res) => {
          this.setState({
            post: res,
          })
        })
        .catch((err) => console.log('ERROR', err))
    })
  }

  render() {
    const { post, frontPageId } = this.state
    if (!post) {
      return <Loading title="Laster forhåndsvisning" />
    }
    return (
      <Fragment>
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
        {parseInt(frontPageId) === parseInt(post.parent) ? (
          <FrontPageNew preview page={post} />
        ) : (
          <Article single preview post={post} />
        )}
      </Fragment>
    )
  }
}

export default Preview
