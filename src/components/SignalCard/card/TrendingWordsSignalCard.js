import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { DesktopOnly } from '../../Responsive'
import Panel from '@santiment-network/ui/Panel/Panel'
import SignalCardHeader from './SignalCardHeader'
import CopySignal from '../controls/CopySignal'
import LikeBtnWrapper from '../../Like/LikeBtnWrapper'
import TrendingCardInsights from './trendingInsights/TrendingCardInsights'
import externalStyles from './SignalCard.module.scss'
import styles from './TrendingWordsSignalCard.module.scss'

const PRESAVED_WORDS = [
  'vechain',
  'binance',
  'crypto',
  'moon',
  'ethereum',
  'ico'
]
const MAX_WORDS_COUNT = 10

const getExpectedCount = settings => {
  if (settings && settings.operation && settings.operation.size) {
    return settings.operation.size
  }

  return MAX_WORDS_COUNT
}

const getWords = (triggerWords, activityPayload) => {
  if (triggerWords) {
    return Array.isArray(triggerWords) ? triggerWords : [triggerWords]
  }

  if (activityPayload) {
    try {
      const spliced = activityPayload.split('\n').splice(5, 10)

      return spliced.reduce((acc, item) => {
        const firstWord = item.split('|')[0]

        if (item) {
          acc.push(firstWord.trim())
        }

        return acc
      }, [])
    } catch (e) {
      console.error(e)
      return PRESAVED_WORDS
    }
  }

  return PRESAVED_WORDS
}

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
    settings: { target = {} },
    isPublic
  } = signal
  const words = getWords(target.word, activityPayload)
  const showingWords = words.slice(0, 6)

  const moreCount = getExpectedCount(settings) - showingWords.length

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
        <h2 className={externalStyles.title}>{title}</h2>

        <div className={styles.words}>
          {showingWords.map((word, index) => (
            <Link
              key={index}
              className={styles.word}
              to={`/labs/trends/explore/${word}`}
            >
              {word}
            </Link>
          ))}

          {moreCount && (
            <Link className={styles.more} to={`/labs/trends`}>
              +{moreCount} more
            </Link>
          )}
        </div>

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

export default TrendingWordsSignalCard
