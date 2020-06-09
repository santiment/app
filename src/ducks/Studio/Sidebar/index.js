import React, { useRef, useEffect } from 'react'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import Icon from '@santiment-network/ui/Icon'
import MetricSelector from './MetricSelector'
import Search from './Search'
import withMetrics from '../withMetrics'
import { MAX_METRICS_AMOUNT } from '../constraints'
import AnomaliesToggle from '../../../components/AnomaliesToggle/AnomaliesToggle'
import { saveToggle } from '../../../utils/localStorage'
import { rebuildDescriptions } from '../../dataHub/metrics/descriptions'
import styles from './index.module.scss'

const Anomalies = ({ options, setOptions }) => {
  function onToggle () {
    setOptions(state => ({
      ...state,
      isAnomalyActive: saveToggle('isAnomalyActive', !state.isAnomalyActive)
    }))
  }

  return (
    <AnomaliesToggle
      className={styles.anomaly}
      isShowAnomalies={options.isAnomalyActive}
      showToggleAnomalies={true}
      onToggleAnomalies={onToggle}
    />
  )
}

const Header = ({ activeMetrics, ...rest }) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        Metrics{' '}
        {rest.options.isMultiChartsActive || (
          <span className={styles.count}>
            ({activeMetrics.length}/{MAX_METRICS_AMOUNT})
          </span>
        )}
      </h2>
      <Search {...rest} />
      <Anomalies {...rest} />
    </div>
  )
}

const CloseButton = ({ onClick, className }) => {
  return (
    <div className={cx(styles.toggle, className)} onClick={onClick}>
      <div className={styles.close}>
        <Icon type='hamburger' className={styles.hamburger} />
        <Icon type='arrow-right' className={styles.arrow} />
      </div>
    </div>
  )
}

const Sidebar = ({ loading, children, ...rest }) => {
  const asideRef = useRef(null)

  useEffect(() => {
    const sidebar = asideRef.current
    const header = document.querySelector('header')

    if (!header) {
      sidebar.style.top = 0
      return
    }

    const { offsetHeight } = header

    function fixSidebar () {
      requestAnimationFrame(() => {
        const dif = offsetHeight - window.scrollY
        sidebar.classList.toggle(styles.fixed, dif < 0)
      })
    }

    fixSidebar()

    window.addEventListener('scroll', fixSidebar)
    return () => window.removeEventListener('scroll', fixSidebar)
  }, [])

  return (
    <aside className={styles.wrapper} ref={asideRef}>
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
