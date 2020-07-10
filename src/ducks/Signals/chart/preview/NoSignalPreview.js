import React from 'react'
import noDataImg from '../../../../assets/signals/backtest_empty.svg'
import HelpPopup from '../../../../components/HelpPopup/HelpPopup'
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
          <HelpPopup>
            We currently don't have enough data to display this. Support of
            backtesting charts for this signal will be added soon!
          </HelpPopup>
        </div>
      </div>
    </div>
  )
}

export default NoSignalPreview
