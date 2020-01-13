import React from 'react'
import cx from 'classnames'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { SignalTypeIcon } from '../../../components/SignalCard/controls/SignalControls'
import { SIGNAL_ANCHORS } from '../../../ducks/Signals/common/constants'
import { dateDifferenceInWordsString } from '../../../utils/dates'
import SignalPreview from '../../../ducks/Signals/chart/SignalPreview'
import styles from './ActivityRenderer.module.scss'

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
        styles.activityItemBacktest,
        classes.activityItem,
        index === 0 && classes.firstActivity
      )}
    >
      <div
        className={cx(
          styles.description,
          styles.activityCustom,
          styles.activityBacktest
        )}
      >
        <SignalTypeIcon type={type} />

        <div className={styles.center}>
          <h4 className={styles.title}>
            <Link
              to={`/sonar/signal/${signalId}${SIGNAL_ANCHORS.ACTIVITIES}`}
              className={styles.link}
            >
              {title}
            </Link>
          </h4>
          <Markdown
            source={Object.values(payload)[0]}
            className={classes.activityMarkdown}
          />

          <span className={styles.dateBacktest}>
            {dateDifferenceInWordsString(triggeredAt)}
          </span>
        </div>
      </div>
      <div className={styles.preview}>
        <SignalPreview
          trigger={trigger}
          type={type}
          showExpand={false}
          showTitle={false}
        />
      </div>
    </div>
  )
}

export default ActivityWithBacktesting
