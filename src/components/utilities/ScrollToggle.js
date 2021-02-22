import { Component } from 'react'
import { getScrollPosition, getDocumentHeight } from '../../utils/functions'

/**
 * Toggles visible state when window scrolls past threshold
 *
 * If threshold is a decimal less than 1, it will be calculated as percentage of document height.
 * I.e. threshold={0.2} will give documentHeight * 0.1
 *
 * <ScrollToggle threshold={500}>
 * ({visible, scrollY, prevScrollY, direction}) => {
 *  <div>{visible ? 'I am above threshold' : 'I am below threshold'}</div>
 * }
 * </ScrollToggle>
 *
 */

export default class Toggle extends Component {
  state = {
    visible: false,
    scrollY: 0,
    prevScrollY: 0,
    direction: 'down',
  }

  handleScroll = () => {
    let threshold = this.props.threshold || 1000
    if (threshold < 1 && threshold > 0) {
      threshold = getDocumentHeight() * threshold
    }
    const scrollOffset = getScrollPosition()
    const scrollY = scrollOffset.y
    const visible = scrollY > threshold
    if (visible !== this.state.visible) {
      this.setState({
        visible,
        scrollY,
        prevScrollY: this.state.scrollY,
        direction: this.state.scrollY < scrollY ? 'down' : 'up',
      })
    }
  }

  componentWillUnmount = () => {
    if (this.scrollListener) {
      window.removeEventListener(this.scrollListener)
    }
  }

  componentDidMount = () => {
    this.scrollListener = window.addEventListener(
      'scroll',
      this.handleScroll,
      false
    )
  }

  render() {
    const { children } = this.props
    return children({ visible: this.state.visible })
  }
}
