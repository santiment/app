import React from 'react'
import cx from 'classnames'
import { noTrendTagsFilter } from '../../../../../components/Insight/utils'
import Panel from '@santiment-network/ui/Panel'
import MarketcapChangeWidget from '../../../../../components/PostVisualBacktest'
import MultilineText from '../../../../../components/MultilineText/MultilineText'
import { makeLinkToInsight } from '../../../../../components/Insight/InsightCardInternals'
import externalStyles from '../../../../../components/Insight/InsightCard.module.scss'
import styles from './MetricInsightCard.module.scss'

const MetricInsightCard = ({ insight }) => {
  const {
    createdAt,
    updatedAt,
    publishedAt,
    id,
    title,
    tags = [],
    user: { username: authorName }
  } = insight

  const filteredTags = tags.filter(noTrendTagsFilter)
  const firstTag = filteredTags[0]

  const linkToInsight = makeLinkToInsight(id, title)

  return (
    <Panel
      className={cx(
        externalStyles.wrapper,
        externalStyles.wrapper_withMc,
        styles.card
      )}
    >
      <a href={linkToInsight} className={styles.title}>
        <MultilineText maxLines={2} id='insightCardTitle' text={title} />
      </a>

      <div className={styles.author}>by {authorName}</div>

      {firstTag && (
        <MarketcapChangeWidget
          from={createdAt}
          ticker={firstTag.name.toUpperCase()}
          updatedAt={updatedAt}
          publishedAt={publishedAt || updatedAt}
          className={styles.widget}
        />
      )}
    </Panel>
  )
}

export default MetricInsightCard
