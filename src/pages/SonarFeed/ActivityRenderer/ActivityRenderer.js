import React from 'react'
import cx from 'classnames'
import { POSSIBLE_METRICS_ACTIVITIES } from '../../../ducks/Signals/utils/constants'
import { couldShowChart } from '../../../ducks/Signals/utils/utils'
import SimpleActivity from './SimpleActivity'
import ActivityWithBacktesting from './ActivityWithBacktesting'
import styles from './ActivityRenderer.module.scss'

const ActivityRenderer = ({
  activity,
  activity: { triggeredAt, trigger = {}, user = {} },
  date,
  index,
  classes = {},
  onLike,
  showProfileExplanation
}) => {
  const { id: signalId, settings } = trigger
  const { target } = settings
  const showChart =
    target && couldShowChart(settings, POSSIBLE_METRICS_ACTIVITIES)

  const triggerDate = triggeredAt || date

  return (
    <div
      key={triggerDate + '_' + signalId}
      className={cx(
        styles.activityItem,
        classes.activityItem,
        index === 0 ? classes.firstActivity : ''
      )}
    >
      <div
        className={cx(styles.content, showChart && styles.activityItemBacktest)}
      >
        {showChart ? (
          <ActivityWithBacktesting
            classes={classes}
            index={index}
            activity={activity}
            user={user}
            date={triggerDate}
            onLike={onLike}
            showProfileExplanation={showProfileExplanation}
          />
        ) : (
          <SimpleActivity
            index={index}
            classes={classes}
            activity={activity}
            onLike={onLike}
            user={user}
            date={triggerDate}
          />
        )}
      </div>
    </div>
  )
}

export default ActivityRenderer
