import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { DesktopOnly } from '../../Responsive'
import Panel from '@santiment-network/ui/Panel/Panel'
import SignalCardHeader from './SignalCardHeader'
import LikeBtnWrapper from '../../Like/LikeBtnWrapper'
import TrendingCardInsights from './trendingInsights/TrendingCardInsights'
import TrendingCardWords from './trendingCard/TrendingCardWords'
import FeedCardDate from '../../../pages/feed/GeneralFeed/CardDate/FeedCardDate'
import { getAmPmWithHours } from '../../../utils/dates'
import externalStyles from './SignalCard.module.scss'
import styles from './TrendingWordsSignalCard.module.scss'

export const isStrictTrendingWords = ({ operation, type }) =>
  type === 'trending_words' && operation && operation.trigger_time

export const isTrendingWordsSignal = trigger => {
  if (!trigger.settings) {
    return false
  }

  if (isStrictTrendingWords(trigger.settings)) {
    return true
  }

  return trigger.settings.operation && trigger.settings.operation.trending_word
}

const TrendingWordsSignalCard = ({
  className,
  activityPayload,
  activity: { votes, trigger: signal, insertedAt: date, user },
  onLike
}) => {
  const {
    id,
    title,
    settings,
    isPublic,
    settings: { operation: { trigger_time } = {} }
  } = signal

  const isStrict = isStrictTrendingWords(settings)

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
          <Link
            to={isStrict ? '/labs/trends' : '/sonar/signal/' + id}
            className={externalStyles.title}
          >
            {title} {<TrendingPeriod period={trigger_time} />}
          </Link>
          <FeedCardDate date={date} />
        </div>

        <TrendingCardWords
          settings={settings}
          activityPayload={activityPayload}
        />

        {isStrict && <TrendingCardInsights date={new Date(date)} />}

        <div className={styles.bottom}>
          <LikeBtnWrapper
            onLike={onLike}
            className={styles.likeBtn}
            votes={votes}
            user={user}
          />
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
      ({getAmPmWithHours(hours - 8)} - {getAmPmWithHours(hours)})
    </div>
  )
}

export default TrendingWordsSignalCard
