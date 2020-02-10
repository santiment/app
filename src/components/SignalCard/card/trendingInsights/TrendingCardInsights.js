import React from 'react'
import { Query } from '@apollo/react-components'
import Icon from '@santiment-network/ui/Icon'
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../../../queries/InsightsGQL'
import { getInsightTrendTagByDate } from '../../../Insight/utils'
import { makeLinkToInsight } from '../../../Insight/InsightCardInternals'
import styles from './TrendingCardInsights.module.scss'

const TrendingCardInsights = ({ date }) => {
  return (
    <Query
      query={ALL_INSIGHTS_BY_TAG_QUERY}
      variables={{
        tag: getInsightTrendTagByDate(date)
      }}
    >
      {({ data: { allInsightsByTag = [] } = {} }) => {
        if (!allInsightsByTag || allInsightsByTag.length === 0) {
          return null
        }

        return (
          <div className={styles.container}>
            <div className={styles.title}>Connected insights</div>

            <div className={styles.list}>
              {allInsightsByTag.map(({ id, title }) => {
                return (
                  <div key={id} className={styles.item}>
                    <a
                      href={makeLinkToInsight(id, title)}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={styles.link}
                    >
                      {title}
                    </a>
                    <Icon type='arrow-right' className={styles.icon} />
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default TrendingCardInsights
