import React, { Component, Fragment } from 'react'
import { getPreview } from '../utils/wp'
import Article from './Article'
import Helmet from 'react-helmet'

class Preview extends Component {
  state = {
    post: false,
  }
  componentDidMount() {
    getPreview(this.props.match.params).then((res) => {
      this.setState({
        post: res[0],
      })
    })
  }
  render() {
    const { post } = this.state
    if (!post) {
      return <div>Laster</div>
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
