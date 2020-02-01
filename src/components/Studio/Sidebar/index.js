import React from 'react'
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
  return (
    <aside className={styles.wrapper}>
      <Header {...rest} />
      <div className={styles.selector}>
        <MetricsSelector {...rest} />
      </div>
    </aside>
  )
}

export default withMetrics(Sidebar)
