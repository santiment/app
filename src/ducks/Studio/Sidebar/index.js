import React, { useRef, useEffect } from 'react'
import Loader from '@santiment-network/ui/Loader/Loader'
import MetricSelector from './MetricSelector'
import Search from './Search'
import AnomaliesToggle from '../../../components/AnomaliesToggle/AnomaliesToggle'
import withMetrics from '../withMetrics'
import styles from './index.module.scss'

const Anomalies = ({ options, setOptions }) => {
  function onToggle () {
    setOptions(state => {
      const isAnomalyActive = !state.isAnomalyActive

      localStorage.setItem('hideAnomalies', isAnomalyActive ? '' : '+')

      return {
        ...state,
        isAnomalyActive
      }
    })
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
        Metrics <span className={styles.count}>({activeMetrics.length}/5)</span>
      </h2>
      <Search {...rest} />
      <Anomalies {...rest} />
    </div>
  )
}

const Sidebar = ({ loading, ...rest }) => {
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
    </aside>
  )
}

export default withMetrics(Sidebar)
