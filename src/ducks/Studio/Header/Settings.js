import React from 'react'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import Button from '@santiment-network/ui/Button'
import Icon from '@santiment-network/ui/Icon'
import AdvancedCalendar from '../../../components/AdvancedCalendar'
import MetricsExplanation from '../Chart/Sidepanel/MetricsExplanation'
import { METRICS_EXPLANATION_PANE } from '../Chart/Sidepanel/panes'
import { getIntervalByTimeRange } from '../../../utils/dates'
import styles from './Settings.module.scss'
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger'

const ShareButton = withRouter(() => (
  <ShareModalTrigger
    trigger={(props) => (
      <Button {...props} className={styles.share}>
        <Icon type='share' />
      </Button>
    )}
    classes={styles}
    shareLink={window.location.href}
  />
))

export default ({
  settings,
  sidepanel,
  className,
  changeTimePeriod,
  toggleSidepanel,
}) => {
  const { timeRange, from, to } = settings

  function onTimerangeChange(timeRange) {
    const { from, to } = getIntervalByTimeRange(timeRange)
    changeTimePeriod(from, to, timeRange)
  }

  function onCalendarChange([from, to]) {
    changeTimePeriod(from, to)
  }

  /* const hasExplanaibles = filterExplainableMetrics(metrics).length > 0 */
  const hasExplanaibles = true

  return (
    <div className={cx(styles.wrapper, className)}>
      {hasExplanaibles && (
        <MetricsExplanation.Button
          onClick={() => toggleSidepanel(METRICS_EXPLANATION_PANE)}
          className={cx(
            sidepanel === METRICS_EXPLANATION_PANE && styles.explain_active,
          )}
        />
      )}
      <AdvancedCalendar
        className={styles.calendar}
        from={new Date(from)}
        to={new Date(to)}
        timeRange={timeRange}
        onCalendarChange={onCalendarChange}
        onTimerangeChange={onTimerangeChange}
      />

      <ShareButton />
    </div>
  )
}
