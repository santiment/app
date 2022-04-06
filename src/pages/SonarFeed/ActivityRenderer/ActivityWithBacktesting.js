import React from 'react'
import cx from 'classnames'
import Markdown from 'react-markdown'
import { SignalTypeIcon } from '../../../components/SignalCard/controls/SignalControls'
import SignalPreview from '../../../ducks/Signals/chart/preview/SignalPreview'
import CopySignal from '../../../components/SignalCard/controls/CopySignal'
import SignalCreator from '../../../components/SignalCard/card/creator/SignalCreator'
import LikeBtnWrapper from '../../../components/Like/LikeBtnWrapper'
import { DesktopOnly, MobileOnly } from '../../../components/Responsive'
import FeedCardDate from '../../feed/GeneralFeed/CardDate/FeedCardDate'
import OpenSignalLink from '../../../ducks/Signals/link/OpenSignalLink'
import { isEthStrictAddress } from '../../../utils/utils'
import FeedHistoricalBalance from '../../feed/GeneralFeed/FeedItemRenderer/feedHistoricalBalance/FeedHistoricalBalance'
import FeedSignalCardWithMarkdown, {
  MoreInfoAlert,
} from '../../feed/GeneralFeed/FeedItemRenderer/feedSignalCardWithMarkdown/FeedSignalCardWithMarkdown'
import SidecarExplanationTooltip from '../../../ducks/SANCharts/SidecarExplanationTooltip'
import TimelineEventComments from '../../../components/TimelineEventComments/TimelineEventComments'
import styles from './ActivityRenderer.module.scss'

export const getUserTriggerData = (activityData) => {
  if (activityData) {
    const { user_trigger_data } = activityData
    const firstKey = Object.keys(user_trigger_data)[0]

    return user_trigger_data[firstKey]
  } else {
    return null
  }
}

export const getDefaultActivityContent = (classes, activity, showMarkdown = true) => {
  const { payload, data: activityData, trigger = {} } = activity

  const data = getUserTriggerData(activityData)

  if (data) {
    if (isEthStrictAddress(data.address)) {
      return <FeedHistoricalBalance user_trigger_data={data} />
    } else if (trigger && showMarkdown) {
      return <FeedSignalCardWithMarkdown trigger={trigger} user_trigger_data={data} />
    }
  }

  return (
    <>
      <Markdown
        source={validateMarkdown(Object.values(payload)[0])}
        className={classes.activityMarkdown}
      />
      {data && data.project_slug && <MoreInfoAlert slug={data.project_slug} type={data.type} />}
    </>
  )
}

const validateMarkdown = (text) => text.replace('not implemented', 'changed')

const ActivityWithBacktesting = ({
  date,
  user,
  classes,
  activity,
  activity: { index, triggeredAt, trigger = {} },
  onLike,
  showProfileExplanation,
}) => {
  const {
    settings: { type, metric },
  } = trigger

  return (
    <>
      <DesktopOnly>
        <SignalTypeIcon type={type} metric={metric} className={styles.icon} />
      </DesktopOnly>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={cx(styles.description, styles.activityCustom, styles.activityBacktest)}>
            <div className={styles.center}>
              <MobileOnly>
                <FeedCardDate date={triggeredAt || date} />
              </MobileOnly>

              <h4 className={styles.title}>
                <OpenSignalLink signal={trigger} />
              </h4>

              {getDefaultActivityContent(classes, activity, false)}

              <div className={styles.tooltip}>
                <SidecarExplanationTooltip
                  closeTimeout={500}
                  localStorageSuffix='_FEED_PROFILE_EXPLANATION'
                  position='top'
                  title='Click to open profile'
                  className={styles.avatarTooltip}
                  description=''
                  isNew
                  withArrow
                  showEnabled={index === 0 && showProfileExplanation}
                >
                  <SignalCreator user={user} className={styles.creator} />
                </SidecarExplanationTooltip>
              </div>
            </div>
          </div>
          <div className={styles.preview}>
            <DesktopOnly>
              <FeedCardDate date={triggeredAt || date} />
            </DesktopOnly>
            <SignalPreview trigger={trigger} type={type} showExpand={false} showTitle={false} />
          </div>
        </div>

        <div className={styles.bottom}>
          <LikesAndComments onLike={onLike} activity={activity} />
          <CopySignal signal={trigger} creatorId={user.id} />
        </div>
      </div>
    </>
  )
}

export const LikesAndComments = ({ onLike, activity: { votes, user, id, commentsCount } }) => {
  return (
    <div className={styles.actions}>
      {onLike && <LikeBtnWrapper onLike={onLike} votes={votes} user={user} />}
      <TimelineEventComments id={id} authorId={user.id} commentsCount={commentsCount} />
    </div>
  )
}

export default ActivityWithBacktesting
