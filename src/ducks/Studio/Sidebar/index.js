import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import Tabs from '@santiment-network/ui/Tabs'
import Icon from '@santiment-network/ui/Icon'
import MetricSelector from './MetricSelector'
import Search from './Search'
import withMetrics from '../withMetrics'
import { rebuildDescriptions } from '../../dataHub/metrics/descriptions'
import styles from './index.module.scss'

const TABS = ['Metrics', 'Insights']
const DEFAULT_TAB = TABS[0]

const Header = ({ activeTab, setActiveTab, ...props }) => (
  <div className={styles.header}>
    <Tabs
      options={TABS}
      className={styles.tabs}
      classes={styles}
      defaultSelectedIndex={activeTab}
      // NOTE: Not passed as a reference, since more than 1 argument is passed to a callback [@vanguard | Aug  4, 2020]
      onSelect={tab => setActiveTab(tab)}
    />
    <Search {...props} />
  </div>
)

const CloseButton = ({ onClick, className }) => (
  <div className={cx(styles.toggle, className)} onClick={onClick}>
    <div className={styles.close}>
      <Icon type='sidebar' className={styles.icon} />
    </div>
  </div>
)

const Sidebar = ({ loading, children, ...rest }) => {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB)

  return (
    <aside className={styles.wrapper}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} {...rest} />
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
