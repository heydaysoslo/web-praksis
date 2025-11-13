import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCategories, getNavMenu, getSettings } from '../../utils/wp'
import mqlistener from '../../utils/mqlistener'

const SiteContext = createContext()

export const Provider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [secondaryItems, setSecondaryItems] = useState([])
  const [settings, setSettings] = useState({
    bloginfo: null,
  })
  const [initialLoad, setInitialLoad] = useState(false)
  const [categories, setCategories] = useState([])
  const [mq, setMq] = useState('sm')

  useEffect(() => {
    mqlistener((mq) => {
      setMq(mq)
    })

    /**
     * Get main settings
     */
    getSettings().then((settings) => {
      setSettings(settings)
    })

    /**
     * Get navigation
     */
    Promise.all([getNavMenu('primary'), getNavMenu('secondary')])
      .then((res) => {
        setMenuItems(res[0].items)
        setSecondaryItems(res[1].items)
      })
      .catch((err) => console.log(err))

    /**
     * Get categories
     */
    getCategories().then((res) => {
      setCategories(res)
    })
  }, [])

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => {
      const newShowMenu = !prevShowMenu
      // Update scroll lock after state update
      setTimeout(() => {
        document.querySelector('html').style.cssText = newShowMenu
          ? 'overflow: hidden;'
          : ''
      }, 0)
      return newShowMenu
    })
  }

  const value = {
    state: {
      showMenu,
      menuItems,
      secondaryItems,
      settings,
      initialLoad,
      categories,
      mq,
    },
    actions: {
      toggleMenu,
    },
  }

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  )
}

export const Consumer = ({ children }) => {
  const context = useContext(SiteContext)
  return children(context)
}

export default SiteContext
