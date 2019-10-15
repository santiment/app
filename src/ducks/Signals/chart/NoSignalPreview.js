import React from 'react'
import noDataImg from './../../../assets/signals/backtest_empty.svg'
import HelpTooltip from '../../../components/WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import styles from './NoSignalPreview.module.scss'

const NoSignalPreview = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.noDataImg}
        src={noDataImg}
        alt='no_signal_preview'
      />
      <div className={styles.explanation}>
        <span>No chart available</span>

        <div className={styles.tooltipContainer}>
          <HelpTooltip withDesc={false} classes={styles}>
            We don't have enough data. Support of backtesting charts for this
            signals will be added later.
          </HelpTooltip>
        </div>
      </div>
    </div>
  )
}

export default NoSignalPreview
