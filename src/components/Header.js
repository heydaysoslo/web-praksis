import React, { Component } from 'react'
import { getNavMenu } from '../utils/wp'
import { Link } from 'react-router-dom'
import { Consumer } from './utilities'
import AdminBar from '../components/AdminBar'
import SideNav from '../components/SideNav'

class Header extends Component {
  state = {
    menuItems: []
  }

  componentDidMount = () => {
    getNavMenu('primary')
      .then(res => {
        this.setState({
          menuItems: res.items
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Consumer>
        {ctx => (
          <header className="App__header Header">
            <AdminBar />
            <div className="container container--fluid">
              <div className="Header__content">
                <Link to={'/'} className="Header__logo">
                  Praksis
                </Link>
                <div className="Header__nav Header__nav--right">
                  <button onClick={ctx.actions.toggleMenu}>Meny</button>
                  <SideNav />
                </div>
              </div>
            </div>
          </header>
        )}
      </Consumer>
    )
  }
}

export default Header
