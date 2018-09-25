import React, { Component } from 'react'

export default class LazysizesBgImage extends Component {
  render() {
    return (
      <div>
        <div
          role="img"
          title="Alt text"
          class="aspect aspect-sm--landscape lazyload bgimage"
          data-bgset="https://fakeimg.pl/400x250 [--sm] | https://fakeimg.pl/800x500 [--md] | https://fakeimg.pl/1600x1000"
          data-sizes="auto"
        />
      </div>
    )
  }
}
