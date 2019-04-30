import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Tabs } from '@santiment-network/ui'
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../../queries/InsightsGQL'
import InsightCard from '../../Insight/InsightCardWithMarketcap'
import News from '../../../components/News/News'
import styles from './TrendsExploreAdditionalInfo.module.scss'

const NEWS_INDEX = 'News'
const INSIGHTS_INDEX = 'Insights'

const TrendsExploreAdditionalInfo = ({
  news,
  isLoadingNews,
  isErrorNews,
  insights,
  isLoadingInsights
}) => {
  let [insightsLength, setInsightsLength] = useState(insights.length)
  let [selectedTab, setSelectedTab] = useState(NEWS_INDEX)

  if (insights.length !== insightsLength && insights.length > 0) {
    setInsightsLength(insights.length)
    setSelectedTab(INSIGHTS_INDEX)
  }

  function handleSelectTab (tab) {
    if (tab !== selectedTab) {
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

  const isNotVisible = isErrorNews || isLoadingNews || isLoadingInsights

  const tabs = []
  if (insights.length > 0) tabs.push(insightsTab)
  if (news.length > 0) tabs.push(newsTab)

  if (tabs.length === 0 || isNotVisible) return null
  return (
    <section className={styles.wrapper}>
      <Tabs
        options={tabs}
        defaultSelectedIndex={selectedTab}
        onSelect={handleSelectTab}
      />
      <div className={styles.tabsContent}>
        {news.length > 0 && selectedTab === NEWS_INDEX && <News data={news} />}
        {insights.length > 0 && selectedTab === INSIGHTS_INDEX && (
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

const filteredInsightsByTrends = insights => {
  const isTrend = tagName => tagName.endsWith('trending-words')
  return insights.filter(
    insight => insight.tags.find(tag => isTrend(tag.name)) !== undefined
  )
}

const mapStateToProps = ({ news: { data = [], isLoading, isError } }) => ({
  news: data,
  isLoadingNews: isLoading,
  isErrorNews: isError
})

const enhance = compose(
  connect(mapStateToProps),
  graphql(ALL_INSIGHTS_BY_TAG_QUERY, {
    options: ({ word }) => ({
      variables: {
        tag: word.toUpperCase()
      }
    }),
    props: ({ data: { allInsightsByTag = [], loading } }) => ({
      insights: filteredInsightsByTrends(allInsightsByTag),
      isLoadingInsights: loading
    })
  })
)

export default enhance(TrendsExploreAdditionalInfo)
