import React from 'react'
import cx from 'classnames'
import { DesktopOnly } from '../../Responsive'
import Panel from '@santiment-network/ui/Panel/Panel'
import SignalCardHeader from './SignalCardHeader'
import CopySignal from '../controls/CopySignal'
import LikeBtnWrapper from '../../Like/LikeBtnWrapper'
import TrendingCardInsights from './trendingInsights/TrendingCardInsights'
import TrendingCardWords from './trendingCard/TrendingCardWords'
import externalStyles from './SignalCard.module.scss'
import styles from './TrendingWordsSignalCard.module.scss'

const TrendingWordsSignalCard = ({
  className,
  activityPayload,
  activity: { votes, trigger: signal, insertedAt: date, user },
  onLike
}) => {
  const { id: creatorId } = user
  const { title, settings, isPublic } = signal

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

export default TrendingWordsSignalCard
