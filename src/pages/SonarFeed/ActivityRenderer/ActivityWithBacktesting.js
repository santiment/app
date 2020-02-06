import React from 'react'
import cx from 'classnames'
import Markdown from 'react-markdown'
import { SignalTypeIcon } from '../../../components/SignalCard/controls/SignalControls'
import SignalPreview from '../../../ducks/Signals/chart/preview/SignalPreview'
import CopySignal from '../../../components/SignalCard/controls/CopySignal'
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator'
import LikeBtnWrapper from '../../../components/Like/LikeBtnWrapper'
import { DesktopOnly } from '../../../components/Responsive'
import FeedCardDate from '../../feed/GeneralFeed/CardDate/FeedCardDate'
import OpenSignalLink from '../../../ducks/Signals/link/OpenSignalLink'
import styles from './ActivityRenderer.module.scss'

const ActivityWithBacktesting = ({
  date,
  user,
  classes,
  activity: { triggeredAt, payload, trigger = {}, votes = [] },
  onLike
}) => {
  const {
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
                <OpenSignalLink signal={trigger} />
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
          {onLike && (
            <LikeBtnWrapper onLike={onLike} votes={votes} user={user} />
          )}
          <CopySignal signal={trigger} creatorId={user.id} />
        </div>
      </div>
    </>
  )
}

export default ActivityWithBacktesting
