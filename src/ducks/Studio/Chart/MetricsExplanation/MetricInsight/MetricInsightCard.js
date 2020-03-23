import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import Panel from '@santiment-network/ui/Panel'
import MultilineText from '../../../../../components/MultilineText/MultilineText'
import { makeLinkToInsight } from '../../../../../components/Insight/InsightCardInternals'
import externalStyles from '../../../../../components/Insight/InsightCard.module.scss'
import styles from './MetricInsightCard.module.scss'

const MetricInsightCard = ({ insight }) => {
  const {
    id,
    title,
    user: { id: authorId, username: authorName }
  } = insight

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

      <Link to={'/profile/' + authorId} className={styles.author}>
        by {authorName}
      </Link>
    </Panel>
  )
}

export default MetricInsightCard
