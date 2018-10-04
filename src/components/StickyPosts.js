import React, { Component } from 'react'
import { getStickyPosts } from '../utils/wp'
import { Link } from 'react-router-dom'
import { getObjectLink } from '../utils/wp'
import uuid from 'uuid/v1'
import Slider from 'react-slick'

export default class StickyPosts extends Component {
  state = {
    posts: [],
    isDragging: false
  }

  componentDidMount = () => {
    getStickyPosts().then(posts => {
      this.setState({
        posts
      })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isDragging === nextState.isDragging
  }

  onClickPrevent = e => {
    if (this.state.isDragging) {
      e.preventDefault()
    }
  }

  render() {
    const { posts } = this.state

    if (!posts.length) {
      return null
    }

    const sliderSettings = {
      mobileFirst: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      swipeToSlide: true,
      // Fix to prevent clicking while dragging
      beforeChange: () => this.setState({ isDragging: true }),
      afterChange: () => this.setState({ isDragging: false }),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    }

    return (
      <div className="StickyPosts container">
        {/* <ul className="StickyPosts__list grid">
          {posts.map(post => {
            return (
              <li
                key={uuid('sticky')}
                className="StickyPosts__item grid__item grid__item--md-4"
              >
                <Link className="StickyPosts__link" to={getObjectLink(post)}>
                  <h3 className="StickyPosts__title">{post.title.rendered}</h3>
                  <span>Les mer</span>
                </Link>
              </li>
            )
          })}
        </ul> */}
        <Slider className="StickiesSlider" {...sliderSettings}>
          {posts.map(post => {
            return (
              <div key={uuid('sticky')} className="StickiesSlider__item">
                <Link
                  onClick={this.onClickPrevent}
                  className="StickiesSlider__link"
                  to={getObjectLink(post)}
                >
                  <h3 className="StickiesSlider__title">
                    {post.title.rendered}
                  </h3>
                  <span>Les mer</span>
                </Link>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
}
