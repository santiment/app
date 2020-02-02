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
import { DesktopOnly } from '../../../components/Responsive'
import styles from './ActivityRenderer.module.scss'
import FeedCardDate from '../../feed/GeneralFeed/CardDate/FeedCardDate'

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
      <DesktopOnly>
        <SignalTypeIcon type={type} className={styles.icon} />
      </DesktopOnly>
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

              <SignalCreator user={user} />
            </div>
          </div>
          <div className={styles.preview}>
            <FeedCardDate date={triggeredAt || date} />
            <SignalPreview
              trigger={trigger}
              type={type}
              showExpand={false}
              showTitle={false}
            />
          </div>
        </div>

        <div className={styles.bottom}>
          {onLike && <LikeBtnWrapper onLike={onLike} votes={votes} />}
          <CopySignal signal={trigger} />
        </div>
      </div>
    </>
  )
}

export default ActivityWithBacktesting
