import React, { Component, Fragment } from 'react'
import { getPreview } from '../utils/wp'
import Article from './Article'
import Helmet from 'react-helmet'
// import {routes} from '../utils/routes'

class Preview extends Component {
  state = {
    post: false
  }
  componentDidMount() {
    getPreview(this.props.match.params.id, this.props.match.params.hash).then(
      res => {
        this.setState({
          post: res[0]
        })
      }
    )
  }
  render() {
    const { post } = this.state
    if (!post) {
      return <div>Loading</div>
    }
    return (
      <Fragment>
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Article post={post} />
      </Fragment>
    )
  }
}

export default Preview
