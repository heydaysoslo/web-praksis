import React, { Component, Fragment } from 'react'
import { getPreview } from '../utils/wp'
import Article from './Article'
import Helmet from 'react-helmet'
import queryString from 'query-string'

class Preview extends Component {
  state = {
    post: false,
  }

  componentDidMount() {
    const qs = queryString.parse(this?.props?.location?.search)
    getPreview({ ...this.props.match.params, nonce: qs?._wpnonce })
      .then((res) => {
        this.setState({
          post: res[0],
        })
      })
      .catch((err) => console.log('ERROR', err))
  }

  render() {
    const { post } = this.state
    if (!post) {
      return <div>Laster...</div>
    }
    return (
      <Fragment>
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>

        <Article single preview post={post} />
      </Fragment>
    )
  }
}

export default Preview
