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
import OpenSignalLink from '../../../ducks/Signals/link/OpenSignalLink'
import SignalCreator from './creator/SignalCreator'
import TimelineEventComments from '../../TimelineEventComments/TimelineEventComments'
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
  activity: { id, commentsCount, votes, trigger, insertedAt: date, user },
  onLike
}) => {
  const {
    title,
    settings,
    isPublic,
    settings: { operation: { trigger_time } = {} }
  } = trigger

  const strictTrendingWords = isStrictTrendingWords(settings)

  return (
    <Panel padding className={cx(externalStyles.wrapper, className)}>
      <DesktopOnly>
        <SignalCardHeader
          isUserTheAuthor={false}
          isPublic={isPublic}
          signal={trigger}
        />
      </DesktopOnly>

      <div className={externalStyles.wrapper__right}>
        <div className={styles.header}>
          {strictTrendingWords ? (
            <Link to='/labs/trends' className={styles.title}>
              {title} {<TrendingPeriod period={trigger_time} />}
            </Link>
          ) : (
            <OpenSignalLink signal={trigger} />
          )}
          <FeedCardDate date={date} />
        </div>

        <TrendingCardWords
          settings={settings}
          activityPayload={activityPayload}
        />

        {strictTrendingWords && <TrendingCardInsights date={new Date(date)} />}

        <SignalCreator user={user} />

        <div className={styles.bottom}>
          <LikeBtnWrapper
            onLike={onLike}
            className={styles.likeBtn}
            votes={votes}
            user={user}
          />
          <TimelineEventComments
            id={id}
            authorId={user.id}
            commentsCount={commentsCount}
          />
        </div>
      </div>
    </Panel>
  )
}

const currentTimezoneOffset = new Date().getTimezoneOffset()

const TrendingPeriod = ({ period }) => {
  if (!period) {
    return null
  }

  const hours = +period.split(':')[0] + (-1 * currentTimezoneOffset) / 60

  const getText = hours => {
    if (hours >= 12 && hours < 20) {
      return 'Europe markets open'
    } else if (hours >= 4 && hours < 12) {
      return 'Asia markets open'
    } else {
      return 'US markets open'
    }
  }

  return <div className={styles.ampm}>({getText(hours)})</div>
}

export default TrendingWordsSignalCard
