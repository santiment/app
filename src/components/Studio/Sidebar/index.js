import React, { useRef, useEffect } from 'react'
import MetricsSelector from '../Metrics/Selector'
import Search from './Search'
import withMetrics from '../Metrics/withMetrics'
import AnomaliesToggle from '../../AnomaliesToggle/AnomaliesToggle'
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

const Sidebar = ({ ...rest }) => {
  const asideRef = useRef(null)

  useEffect(() => {
    const sidebar = asideRef.current
    const { offsetHeight } = document.querySelector('header')

    function fixSidebar () {
      const dif = offsetHeight - window.scrollY
      if (dif >= 0) {
        sidebar.style.top = dif + 'px'
      }
    }

    window.addEventListener('scroll', fixSidebar)

    return () => window.removeEventListener('scroll', fixSidebar)
  }, [])

  return (
    <aside className={styles.wrapper} ref={asideRef}>
      <Header {...rest} />
      <div className={styles.selector}>
        <MetricsSelector {...rest} />
      </div>
    </aside>
  )
}

export default withMetrics(Sidebar)
