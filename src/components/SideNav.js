import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Consumer } from './utilities/Context'
import Portal from './utilities/Portal'
import NavMenu from '../components/NavMenu'
import cc from 'classcat'

const drawerVariants = {
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: { duration: 0.15 },
  },
}

const backdropVariants = {
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

const SideNav = () => {
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
            <AnimatePresence>
              {ctx.state.showMenu && (
                <>
                  <motion.div
                    key="drawer"
                    className="SideNav__drawer"
                    variants={drawerVariants}
                    initial="exit"
                    animate="enter"
                    exit="exit"
                  >
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
                  </motion.div>
                  <motion.div
                    key="backdrop"
                    onClick={ctx.actions.toggleMenu}
                    className="SideNav__backdrop"
                    variants={backdropVariants}
                    initial="exit"
                    animate="enter"
                    exit="exit"
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </Portal>
      )}
    </Consumer>
  )
}

export default SideNav
