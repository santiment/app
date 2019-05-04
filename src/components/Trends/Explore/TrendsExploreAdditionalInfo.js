import React, { useState } from 'react'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Tabs } from '@santiment-network/ui'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../../queries/InsightsGQL'
import { NEWS_QUERY } from '../../News/NewsGQL'
import {
  getInsightTrendTagByDate,
  oneDayTimestamp
} from '../../Insight/InsightsTrends'
import InsightCard from '../../Insight/InsightCard'
import News from '../../News/News'
import styles from './TrendsExploreAdditionalInfo.module.scss'

const NEWS_INDEX = 'News'
const INSIGHTS_INDEX = 'Insights'

const TrendsExploreAdditionalInfo = ({ news, allInsightsByTag: insights }) => {
  let [selectedTab, setSelectedTab] = useState(null)

  function handleSelectTab (tab) {
    if (tab !== (selectedTab || defaultSelectedTab)) {
      setSelectedTab(tab)
    }
  }

  const newsTab = {
    index: NEWS_INDEX,
    content: `${NEWS_INDEX} (${news.length})`
  }

  const insightsTab = {
    index: INSIGHTS_INDEX,
    content: `${INSIGHTS_INDEX} (${insights.length})`
  }

  const tabs = []
  if (insights.length > 0) tabs.push(insightsTab)
  if (news.length > 0) tabs.push(newsTab)

  let defaultSelectedTab

  if (tabs.length === 0) return null
  else defaultSelectedTab = tabs[0].index

  return (
    <section className={styles.wrapper}>
      <Tabs
        options={tabs}
        defaultSelectedIndex={defaultSelectedTab}
        onSelect={handleSelectTab}
      />
      <div className={styles.tabsContent}>
        {(selectedTab || defaultSelectedTab) === NEWS_INDEX && (
          <News data={news} />
        )}
        {(selectedTab || defaultSelectedTab) === INSIGHTS_INDEX && (
          <div className={styles.insights}>
            {insights.map(insight => (
              <InsightCard
                {...insight}
                key={insight.id}
                className={styles.insight}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const getTrendsTags = numberOfLastDays => {
  const trendsTags = []
  for (let i = 0; i < numberOfLastDays; i++) {
    trendsTags.push(
      getInsightTrendTagByDate(new Date(Date.now() - oneDayTimestamp * i))
    )
  }

  return trendsTags
}

const filteredInsightsByWord = (insights, word) => {
  return insights.filter(
    insight => insight.tags.find(tag => tag.name === word) !== undefined
  )
}

const getPast3DaysInsightsByTrendTag = () => {
  let filterInsightsByWord
  return getTrendsTags(3).map(tag =>
    graphql(ALL_INSIGHTS_BY_TAG_QUERY, {
      options: ({ word }) => {
        filterInsightsByWord = word.toUpperCase()
        return {
          variables: { tag },
          fetchPolicy: 'cache-and-network'
        }
      },
      props: ({
        data: { allInsightsByTag = [] },
        ownProps: { allInsightsByTag: ownInsights = [] }
      }) => ({
        allInsightsByTag: allInsightsByTag.concat(
          filteredInsightsByWord(ownInsights, filterInsightsByWord)
        )
      })
    })
  )
}

const enhance = compose(
  ...getPast3DaysInsightsByTrendTag(),
  graphql(NEWS_QUERY, {
    options: ({ word }) => {
      const { from, to } = getTimeIntervalFromToday(-3, DAY)
      return {
        variables: {
          from,
          to,
          tag: word,
          size: 6
        }
      }
    },
    props: ({ data: { news = [] } }) => ({ news: news.reverse() })
  })
)

export default enhance(TrendsExploreAdditionalInfo)
