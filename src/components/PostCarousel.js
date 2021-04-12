import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getObjectLink, getPostsByIds } from '../utils/wp'
import uuid from 'uuid/v1'
import Slider from 'react-slick'
// import AcfImage from '../components/AcfImage'
import AcfBgset from './AcfBgset'
import cc from 'classcat'

export default class PostCarousel extends Component {
  state = {
    posts: [],
    isDragging: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isDragging === nextState.isDragging
  }

  componentDidMount = () => {
    getPostsByIds(this.props.posts).then((posts) => {
      this.setState({ posts })
    })
  }

  onClickPrevent = (e) => {
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
      infinite: false,
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
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    }

    return (
      <div
        className={cc({
          PostCarousel: true,
          [this.props.className]: this.props.className,
        })}
      >
        <div className="container">
          <Slider className="StickiesSlider" {...sliderSettings}>
            {posts.map((post) => {
              return (
                <div key={uuid('sticky')} className="StickiesSlider__item">
                  <Link
                    onClick={this.onClickPrevent}
                    className="StickiesSlider__link"
                    to={getObjectLink(post)}
                  >
                    {post.featured_image ? (
                      <AcfBgset
                        className="StickiesSlider__image"
                        image={post.featured_image}
                        aspect="landscape"
                      />
                    ) : (
                      <div className="StickiesSlider__image aspect aspect--landscape" />
                    )}
                    <div className="StickiesSlider__content">
                      <div className="StickiesSlider__inner">
                        <h3 className="StickiesSlider__title">
                          {post.title.rendered}
                        </h3>
                        <span className="StickiesSlider__more">Les mer</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    )
  }
}
