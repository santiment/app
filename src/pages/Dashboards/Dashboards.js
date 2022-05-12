import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import cx from 'classnames'
import { track } from 'webkit/analytics'
import AsideNav from './AsideNav/AsideNav'
import { useNavigationAnchor } from '../../components/LeftPageNavigation/LeftPageNavigation'
import { useEventListener } from '../../hooks/eventListeners'
import { useDebounce } from '../../hooks'
import { PATHS } from '../../paths'
import { DASHBOARDS } from './constants'
import { findScrollProperties, scrollToCurrentAnchor } from './utils'
import styles from './Dashboards.module.scss'

const Dashboards = ({ location, history }) => {
  const [currentDashboard, setCurrentDashboard] = useState(DASHBOARDS[0])
  const { setActive, active } = useNavigationAnchor(currentDashboard.submenu || [])
  const setActiveDebounced = useDebounce(() => {
    const { tab } = findScrollProperties(currentDashboard)

    if (tab && active && tab.key !== active.key) {
      setActive(tab)
    }
  }, 150)

  const { pathname, hash } = location

  useEffect(() => {
    track.pageview('sanbase')

    if (pathname === PATHS.DASHBOARDS) {
      history.push(`${pathname}${currentDashboard.to}`)
      return
    }

    if (pathname !== `${PATHS.DASHBOARDS}${currentDashboard.to}`) {
      setCurrentDashboard(
        DASHBOARDS.find((dashboard) => dashboard.to === pathname.replace('/dashboards', '')),
      )
    }
  }, [pathname])

  useEffect(() => {
    if (hash && currentDashboard && currentDashboard.submenu) {
      scrollToCurrentAnchor({ currentDashboard, hash })
    }
  }, [currentDashboard])

  useEventListener('scroll', () => {
    if (currentDashboard && currentDashboard.submenu) {
      setActiveDebounced()
    }
  })

  const { Content, name, description, submenu } = currentDashboard

  return (
    <div className={cx(styles.wrapper, 'row')}>
      <Helmet>
        <title>{currentDashboard.name}</title>
        <meta property='og:title' content={currentDashboard.name} />
        <meta property='og:description' content={currentDashboard.description} />
      </Helmet>
      <div className={styles.aside}>
        <AsideNav
          location={location}
          history={history}
          currentDashboard={currentDashboard}
          setCurrentDashboard={setCurrentDashboard}
          currentAnchor={active}
          setCurrentAnchor={setActive}
        />
      </div>
      {Content && (
        <Content
          history={history}
          submenu={submenu}
          description={description}
          shareLinkText={description || name}
        />
      )}
    </div>
  )
}

export default Dashboards
