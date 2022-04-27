import React from 'react'
import cx from 'classnames'
import noDataImg from '../../../../assets/signals/backtest_empty.svg'
import HelpPopup from '../../../../components/HelpPopup/HelpPopup'
import styles from './NoSignalPreview.module.scss'

const NoSignalPreview = ({ className }) => {
  return (
    <div className={cx(styles.container, className)}>
      <img className={styles.noDataImg} src={noDataImg} alt='no_signal_preview' />
      <div className={styles.explanation}>
        <span className={styles.label}>No chart available</span>
        <HelpPopup>
          We currently don't have enough data to display this. Support of backtesting charts for
          this signal will be added soon!
        </HelpPopup>
      </div>
    </div>
  )
}

export default NoSignalPreview
