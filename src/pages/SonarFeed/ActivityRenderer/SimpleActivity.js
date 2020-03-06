import React from 'react'
import cx from 'classnames'
import { SignalTypeIcon } from '../../../components/SignalCard/controls/SignalControls'
import CopySignal from '../../../components/SignalCard/controls/CopySignal'
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator'
import { DesktopOnly } from '../../../components/Responsive'
import FeedCardDate from '../../feed/GeneralFeed/CardDate/FeedCardDate'
import LikeBtnWrapper from '../../../components/Like/LikeBtnWrapper'
import OpenSignalLink from '../../../ducks/Signals/link/OpenSignalLink'
import { getDefaultActivityContent } from './ActivityWithBacktesting'
import styles from './ActivityRenderer.module.scss'

const SimpleActivity = ({
  date,
  classes,
  user,
  activity,
  activity: {
    triggeredAt,
    trigger,
    trigger: { settings: { type, metric } } = {},
    votes = []
  },
  onLike
}) => {
  return (
    <div className={styles.wrapper}>
      <DesktopOnly>
        <SignalTypeIcon type={type} metric={metric} className={styles.icon} />
      </DesktopOnly>
      <div className={styles.center}>
        <div className={cx(styles.description, styles.activityCustom)}>
          <h4 className={styles.title}>
            <OpenSignalLink signal={trigger} />
            <FeedCardDate date={triggeredAt || date} />
          </h4>
        </div>
        {getDefaultActivityContent(classes, activity)}
        <SignalCreator user={user} />
        <div className={styles.bottom}>
          {onLike && (
            <LikeBtnWrapper onLike={onLike} votes={votes} user={user} />
          )}
          <CopySignal signal={trigger} creatorId={user.id} />
        </div>
      </div>
    </div>
  )
}

export default SimpleActivity
