import React, { useEffect } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import Icon from '@santiment-network/ui/Icon'
import MetricSelector from './MetricSelector'
import Search from './Search'
import withMetrics from '../withMetrics'
import { rebuildDescriptions } from '../../dataHub/metrics/descriptions'
import styles from './index.module.scss'

const Header = props => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Metrics</h2>
      <Search {...props} />
    </div>
  )
}

const CloseButton = ({ onClick, className }) => {
  return (
    <div className={cx(styles.toggle, className)} onClick={onClick}>
      <div className={styles.close}>
        <Icon type='sidebar' className={styles.icon} />
      </div>
    </div>
  )
}

const Sidebar = ({ loading, children, ...rest }) => {
  return (
    <aside className={styles.wrapper}>
      <Header {...rest} />
      <div className={styles.selector}>
        {loading ? (
          <Loader className={styles.loading} />
        ) : (
          <MetricSelector {...rest} />
        )}
      </div>
      {children}
    </aside>
  )
}

export default withMetrics(
  ({ isSidebarClosed, setIsSidebarClosed, ...props }) => {
    function openSidebar () {
      setIsSidebarClosed(false)
    }

    function closeSidebar () {
      setIsSidebarClosed(true)
    }

    const { Submetrics } = props

    useEffect(
      () => {
        rebuildDescriptions(Submetrics)
      },
      [Submetrics]
    )

    return isSidebarClosed ? (
      <CloseButton onClick={openSidebar} className={styles.toggle_closed} />
    ) : (
      <Sidebar {...props} openSidebar={openSidebar} closeSidebar={closeSidebar}>
        <CloseButton onClick={closeSidebar} />
      </Sidebar>
    )
  }
)
