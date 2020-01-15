import React from 'react'
import cx from 'classnames'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { SignalTypeIcon } from '../../../components/SignalCard/controls/SignalControls'
import { SIGNAL_ANCHORS } from '../../../ducks/Signals/common/constants'
import { dateDifferenceInWordsString } from '../../../utils/dates'
import SignalPreview from '../../../ducks/Signals/chart/SignalPreview'
import styles from './ActivityRenderer.module.scss'
import CopySignal from '../../../components/SignalCard/controls/CopySignal'

const ActivityWithBacktesting = ({
  date,
  classes,
  activity: { triggeredAt, payload, trigger = {} }
}) => {
  const {
    id: signalId,
    title,
    settings: { type }
  } = trigger
  return (
    <>
      <SignalTypeIcon type={type} className={styles.icon} />
      <div>
        <div className={styles.info}>
          <div
            className={cx(
              styles.description,
              styles.activityCustom,
              styles.activityBacktest
            )}
          >
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
                {dateDifferenceInWordsString(triggeredAt || date)}
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

        <CopySignal signal={trigger} />
      </div>
    </>
  )
}

export default ActivityWithBacktesting
