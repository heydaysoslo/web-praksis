import React, { Component } from 'react'
import { getPreview } from '../utils/wp'
// import {routes} from '../utils/routes'

class Preview extends Component {
  componentDidMount() {
    // this.props.match.params
    // req.params.id, wpnonce: req.params.wpnonce
    getPreview(
      this.props.match.params.id,
      this.props.match.params.wpnonce
    ).then(res => console.log(res))
  }
  render() {
    return (
      <div>
        <h3>Denne funksjonaliteten er foreløpig under utvikling</h3>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}

export default Preview
