import React from 'react'
import cx from 'classnames'
import { DesktopOnly } from '../../Responsive'
import Panel from '@santiment-network/ui/Panel/Panel'
import SignalCardHeader from './SignalCardHeader'
import CopySignal from '../controls/CopySignal'
import LikeBtnWrapper from '../../Like/LikeBtnWrapper'
import TrendingCardInsights from './trendingInsights/TrendingCardInsights'
import TrendingCardWords from './trendingCard/TrendingCardWords'
import FeedCardDate from '../../../pages/feed/GeneralFeed/CardDate/FeedCardDate'
import externalStyles from './SignalCard.module.scss'
import styles from './TrendingWordsSignalCard.module.scss'

const TrendingWordsSignalCard = ({
  className,
  activityPayload,
  activity: { votes, trigger: signal, insertedAt: date, user },
  onLike
}) => {
  const { id: creatorId } = user
  const {
    title,
    settings,
    isPublic,
    settings: { operation: { trigger_time } = {} }
  } = signal
  console.log(trigger_time)

  return (
    <Panel padding className={cx(externalStyles.wrapper, className)}>
      <DesktopOnly>
        <SignalCardHeader
          isUserTheAuthor={false}
          isPublic={isPublic}
          signal={signal}
        />
      </DesktopOnly>

      <div className={externalStyles.wrapper__right}>
        <div className={styles.header}>
          <h2 className={externalStyles.title}>
            {title} {<TrendingPeriod period={trigger_time} />}
          </h2>
          <FeedCardDate date={date} />
        </div>

        <TrendingCardWords
          settings={settings}
          activityPayload={activityPayload}
        />

        <TrendingCardInsights date={new Date(date)} />

        <div className={styles.bottom}>
          <LikeBtnWrapper
            onLike={onLike}
            className={styles.likeBtn}
            votes={votes}
          />
          <CopySignal signal={signal} creatorId={creatorId} />
        </div>
      </div>
    </Panel>
  )
}

const TrendingPeriod = ({ period }) => {
  if (!period) {
    return null
  }

  const hours = period.split(':')[0]

  return (
    <div className={styles.ampm}>
      ({getAmPm(hours - 8)} - {getAmPm(hours)})
    </div>
  )
}

const getAmPm = hours => {
  if (hours < 0) {
    hours = 24 - hours
  }

  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours || 12
  return hours + ampm
}

export default TrendingWordsSignalCard
