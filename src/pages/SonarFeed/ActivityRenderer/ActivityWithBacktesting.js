import React from 'react'
import cx from 'classnames'
import Markdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { SignalTypeIcon } from '../../../components/SignalCard/controls/SignalControls'
import { SIGNAL_ANCHORS } from '../../../ducks/Signals/common/constants'
import SignalPreview from '../../../ducks/Signals/chart/preview/SignalPreview'
import CopySignal from '../../../components/SignalCard/controls/CopySignal'
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator'
import LikeBtnWrapper from '../../../components/Like/LikeBtnWrapper'
import styles from './ActivityRenderer.module.scss'

const ActivityWithBacktesting = ({
  date,
  user,
  classes,
  activity: { triggeredAt, payload, trigger = {}, votes = [] },
  onLike
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

              <SignalCreator user={user} date={triggeredAt || date} />
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

        <CopySignal signal={trigger}>
          <LikeBtnWrapper
            onClick={onLike}
            className={styles.likeBtn}
            votes={votes}
          />
        </CopySignal>
      </div>
    </>
  )
}

export default ActivityWithBacktesting
