import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import cx from 'classnames'
import { SIGNAL_ANCHORS } from '../../ducks/Signals/common/constants'
import { dateDifferenceInWordsString } from '../../utils/dates'
import { POSSIBLE_METRICS_ACTIVITIES } from '../../ducks/Signals/utils/constants'
import { couldShowChart } from '../../ducks/Signals/utils/utils'
import styles from './ActivityRenderer.module.scss'
import SignalPreview from '../../ducks/Signals/chart/SignalPreview'

const ActivityRenderer = ({
  activity,
  activity: { triggeredAt, trigger: { id: signalId, settings } = {} },
  index,
  classes = {}
}) => {
  const { target } = settings
  const showChart =
    target && couldShowChart(settings, POSSIBLE_METRICS_ACTIVITIES)

  console.log(showChart)

  return (
    <Fragment key={triggeredAt + '_' + signalId}>
      {showChart ? (
        <ActivityWithBacktesting
          classes={classes}
          index={index}
          activity={activity}
        />
      ) : (
        <SimpleActivity index={index} classes={classes} activity={activity} />
      )}
    </Fragment>
  )
}

const SimpleActivity = ({
  index,
  classes,
  activity: { triggeredAt, payload, trigger: { id: signalId, title } = {} }
}) => (
  <div
    className={cx(
      styles.activityItem,
      classes.activityItem,
      index === 0 && classes.firstActivity
    )}
  >
    <div className={cx(styles.description, classes.activityCustom)}>
      <h4 className={styles.title}>
        <Link
          to={`/sonar/signal/${signalId}${SIGNAL_ANCHORS.ACTIVITIES}`}
          className={styles.link}
        >
          {title}
        </Link>
        <span className={styles.date}>
          {dateDifferenceInWordsString(triggeredAt)}
        </span>
      </h4>
    </div>
    <Markdown
      source={Object.values(payload)[0]}
      className={classes.activityMarkdown}
    />
  </div>
)

const ActivityWithBacktesting = ({
  index,
  classes,
  activity: { triggeredAt, payload, trigger = {} }
}) => {
  const {
    id: signalId,
    title,
    settings: { type }
  } = trigger
  return (
    <div
      className={cx(
        styles.activityItem,
        classes.activityItem,
        index === 0 && classes.firstActivity
      )}
    >
      <div className={cx(styles.description, classes.activityCustom)}>
        <h4 className={styles.title}>
          <Link
            to={`/sonar/signal/${signalId}${SIGNAL_ANCHORS.ACTIVITIES}`}
            className={styles.link}
          >
            {title}
          </Link>
          <span className={styles.date}>
            {dateDifferenceInWordsString(triggeredAt)}
          </span>
        </h4>
      </div>
      <Markdown
        source={Object.values(payload)[0]}
        className={cx(classes.activityMarkdown, styles.hiddenImg)}
      />
      <SignalPreview trigger={trigger} type={type} showExpand={false} />
    </div>
  )
}

export default ActivityRenderer
