import React, { Component } from 'react'
import { Consumer } from './utilities/Context'
import Portal from './utilities/Portal'
import posed, { PoseGroup } from 'react-pose'
import NavMenu from '../components/NavMenu'
import cc from 'classcat'

const Drawer = posed.div({
  enter: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: { duration: 150 },
  },
  open: {
    delayChildren: 200,
    staggerChildren: 50,
  },
})

const Backdrop = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
})

export default class SideNav extends Component {
  render() {
    return (
      <Consumer>
        {(ctx) => (
          <Portal>
            <div
              className={cc({
                SideNav: true,
                'SideNav--open': ctx.state.showMenu,
              })}
            >
              <PoseGroup>
                {ctx.state.showMenu && [
                  <Drawer key="shade" className="SideNav__drawer">
                    <div className="SideNav__content container container--fluid">
                      <div className="SideNav__header">
                        <button
                          className="SideNav__close"
                          onClick={ctx.actions.toggleMenu}
                        >
                          <div className="Close">
                            <span />
                            <span />
                          </div>
                        </button>
                      </div>
                      <div className="SideNav__menus">
                        {ctx.state.menuItems && (
                          <NavMenu
                            homeLink
                            toggle={ctx.actions.toggleMenu}
                            items={ctx.state.menuItems}
                          />
                        )}
                        {ctx.state.secondaryItems && (
                          <NavMenu
                            small
                            toggle={ctx.actions.toggleMenu}
                            items={ctx.state.secondaryItems}
                          />
                        )}
                      </div>
                    </div>
                  </Drawer>,
                  <Backdrop
                    onClick={ctx.actions.toggleMenu}
                    key="modal"
                    className="SideNav__backdrop"
                  />,
                ]}
              </PoseGroup>
            </div>
          </Portal>
        )}
      </Consumer>
    )
  }
}
