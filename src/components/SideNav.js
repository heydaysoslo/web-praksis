import React, { Component } from 'react'
import { Consumer, Portal } from './utilities'
// import { NavLink } from 'react-router-dom'
// import uuid from 'uuid/v1'
import posed, { PoseGroup } from 'react-pose'
import NavMenu from '../components/NavMenu'
import cc from 'classcat'

const Drawer = posed.div({
  enter: {
    x: 0,
    opacity: 1
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: { duration: 150 }
  },
  open: {
    delayChildren: 200,
    staggerChildren: 50
  }
})

const Backdrop = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
})

export default class SideNav extends Component {
  render() {
    return (
      <Consumer>
        {ctx => (
          <Portal>
            <div
              className={cc({
                SideNav: true,
                'SideNav--open': ctx.state.showMenu
              })}
            >
              <PoseGroup>
                {ctx.state.showMenu && [
                  <Drawer key="shade" className="SideNav__drawer">
                    <div className="SideNav__content">
                      <div className="SideNav__header">
                        <button
                          className="SideNav__close"
                          onClick={ctx.actions.toggleMenu}
                        >
                          Lukk
                        </button>
                      </div>
                      {/* <nav className="SideNav__nav SideNav__nav--primary">
                      <ul className="SideNav__list">
                        <li className="SideNav__item SideNav__item--title">
                          <h3 className="nolead">Mere stuffs</h3>
                        </li>
                      </ul>
                    </nav> */}
                      <NavMenu
                        toggle={ctx.actions.toggleMenu}
                        items={ctx.state.menuItems}
                      />
                    </div>
                  </Drawer>,
                  <Backdrop
                    onClick={ctx.actions.toggleMenu}
                    key="modal"
                    className="SideNav__backdrop"
                  />
                ]}
              </PoseGroup>
            </div>
          </Portal>
        )}
      </Consumer>
    )
  }
}
