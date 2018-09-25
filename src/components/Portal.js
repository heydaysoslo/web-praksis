import { Component } from 'react'
import ReactDOM from 'react-dom'

const portalRoot = document.getElementById('portal')

class Portal extends Component {
  constructor() {
    super()
    this.el = document.createElement('div')
  }

  componentDidMount = () => {
    document.body.style.overflow = 'hidden'
    portalRoot.appendChild(this.el)
  }

  componentWillUnmount = () => {
    document.body.style.overflow = ''
    portalRoot.removeChild(this.el)
  }

  render() {
    const { children } = this.props
    return ReactDOM.createPortal(children, this.el)
  }
}

export default Portal
