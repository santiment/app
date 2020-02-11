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
import { isEthStrictAddress } from '../../../utils/utils'
import FeedHistoricalBalance from '../../feed/GeneralFeed/FeedItemRenderer/feedHistoricalBalance/FeedHistoricalBalance'
import styles from './ActivityRenderer.module.scss'

function getDefaultActivityContent (
  classes,
  { payload, data: { user_trigger_data } = {} }
) {
  const firstKey = Object.keys(user_trigger_data)[0]

  if (isEthStrictAddress(firstKey)) {
    return <FeedHistoricalBalance data={user_trigger_data[firstKey]} />
  }

  return (
    <Markdown
      source={Object.values(payload)[0]}
      className={classes.activityMarkdown}
    />
  )
}

const ActivityWithBacktesting = ({
  date,
  user,
  classes,
  activity,
  activity: { triggeredAt, trigger = {}, votes = [] },
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
      <div className={styles.container}>
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

              {getDefaultActivityContent(classes, activity)}

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
