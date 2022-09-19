import React, { useEffect } from 'react'
import cx from 'classnames'
import NavItem from './NavItem/NavItem'
import { extractFirstAnchor } from '../../../components/LeftPageNavigation/LeftPageNavigation'
import { PATHS } from '../../../paths'
import { DASHBOARDS } from '../constants'
import styles from './AsideNav.module.scss'

const AsideNav = ({
  location,
  history,
  currentDashboard,
  setCurrentDashboard,
  currentAnchor,
  setCurrentAnchor,
}) => {
  const { pathname } = location
  const { submenu } = currentDashboard

  useEffect(() => {
    if (submenu) {
      const anchorByPath = extractFirstAnchor(submenu || [], history.location.hash, 'key', true)

      if (!currentAnchor && anchorByPath) {
        setCurrentAnchor(anchorByPath)
      }
    }
  }, [submenu])

  function handleSelectDashboard(dashboard) {
    return () => {
      setCurrentDashboard(dashboard)
      setCurrentAnchor(undefined)
      window.scroll({
        top: 0,
      })

      const updatedPath = `${PATHS.DASHBOARDS}${dashboard.to}`

      if (pathname !== updatedPath) {
        history.push(dashboard.shouldRedirect ? dashboard.to : updatedPath)
      }
    }
  }

  return (
    <div className={cx(styles.wrapper, 'column fluid')}>
      {DASHBOARDS.map((dashboard) => (
        <NavItem
          key={dashboard.name}
          isActive={dashboard.name === currentDashboard.name}
          onClick={handleSelectDashboard(dashboard)}
          currentAnchor={currentAnchor}
          setCurrentAnchor={setCurrentAnchor}
          history={history}
          currentDashboard={currentDashboard}
          {...dashboard}
        />
      ))}
    </div>
  )
}

export default AsideNav
