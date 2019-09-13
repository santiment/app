import React from 'react'
import cx from 'classnames'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import HelpTooltip from '../WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import FlashIconPath from './FlashIconPath'
import styles from './AnomaliesToggle.module.scss'

const AnomaliesToggle = ({
  onToggleAnomalies,
  isShowAnomalies,
  showToggleAnomalies
}) => {
  return showToggleAnomalies ? (
    <Button
      variant='flat'
      onClick={onToggleAnomalies}
      className={cx(styles.wrapper, isShowAnomalies && styles.active)}
    >
      <HelpTooltip
        withDesc={false}
        classes={{
          question: isShowAnomalies && styles.question,
          tooltip: styles.tooltip
        }}
      />
      Anomalies
      <Toggle
        isActive={isShowAnomalies}
        className={styles.toggle}
        Icon={FlashIconPath}
      />
    </Button>
  ) : null
}

export default AnomaliesToggle
