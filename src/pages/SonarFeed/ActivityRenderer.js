import React from 'react'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import cx from 'classnames'
import { SIGNAL_ANCHORS } from '../../ducks/Signals/common/constants'
import { dateDifferenceInWords } from '../../utils/dates'
import styles from './ActivityRenderer.module.scss'

const formatDate = dateString => {
  return dateDifferenceInWords({
    from: new Date(dateString)
  })
}

const ActivityRenderer = ({
  activity: { triggeredAt, payload, trigger: { id: signalId, title } = {} },
  index,
  classes = {}
}) => (
  <div
    key={triggeredAt + '_' + signalId}
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
        <span className={styles.date}>{formatDate(triggeredAt)}</span>
      </h4>
    </div>
    <Markdown
      source={Object.values(payload)[0]}
      className={classes.activityMarkdown}
    />
  </div>
)

export default ActivityRenderer
