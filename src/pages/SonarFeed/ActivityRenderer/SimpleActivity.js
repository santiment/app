import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import { SignalTypeIcon } from '../../../components/SignalCard/controls/SignalControls'
import { SIGNAL_ANCHORS } from '../../../ducks/Signals/common/constants'
import { dateDifferenceInWordsString } from '../../../utils/dates'
import styles from './ActivityRenderer.module.scss'

const SimpleActivity = ({
  index,
  classes,
  activity: {
    triggeredAt,
    payload,
    trigger: { id: signalId, title, settings: { type } } = {}
  }
}) => {
  return (
    <div
      className={cx(
        styles.activityItem,
        classes.activityItem,
        index === 0 && classes.firstActivity
      )}
    >
      <SignalTypeIcon type={type} />
      <div className={styles.center}>
        <div className={cx(styles.description, styles.activityCustom)}>
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
    </div>
  )
}

export default SimpleActivity
