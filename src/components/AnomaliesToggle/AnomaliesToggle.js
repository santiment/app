import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import Toggle from '@santiment-network/ui/Toggle'
import Button from '@santiment-network/ui/Button'
import HelpTooltip from '../WatchlistOverview/WatchlistAnomalies/HelpTooltip'
import FlashIconPath from './FlashIconPath'
import styles from './AnomaliesToggle.module.scss'

const AnomaliesToggle = ({
  className,
  onToggleAnomalies,
  isShowAnomalies,
  showToggleAnomalies,
  isBeta
}) => {
  return showToggleAnomalies && isBeta ? (
    <Button variant='flat' className={cx(styles.wrapper, className)}>
      <Toggle
        isActive={isShowAnomalies}
        className={cx(styles.toggle, isShowAnomalies && styles.active)}
        Icon={FlashIconPath}
        onClick={onToggleAnomalies}
      />
      Anomalies
      <HelpTooltip
        withDesc={false}
        classes={{
          helpTrigger: styles.trigger,
          question: cx(styles.question, isShowAnomalies && styles.question),
          tooltip: styles.tooltip
        }}
        note='Important! It will be disabled if "Trending position" is turn on'
      />
    </Button>
  ) : null
}

const mapStateToProps = ({ rootUi: { isBetaModeEnabled } }) => ({
  isBeta: isBetaModeEnabled
})

export default connect(mapStateToProps)(AnomaliesToggle)
