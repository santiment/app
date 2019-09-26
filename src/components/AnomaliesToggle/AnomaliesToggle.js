import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import HelpTooltip from '../WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import FlashIconPath from './FlashIconPath'
import styles from './AnomaliesToggle.module.scss'

const AnomaliesToggle = ({
  onToggleAnomalies,
  isShowAnomalies,
  showToggleAnomalies,
  isBeta
}) => {
  return showToggleAnomalies && isBeta ? (
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
        note='Important! It will be disabled if "Trending position" is turn on'
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

const mapStateToProps = ({ rootUi: { isBetaModeEnabled } }) => ({
  isBeta: isBetaModeEnabled
})

export default connect(mapStateToProps)(AnomaliesToggle)
