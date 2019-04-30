import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Tabs } from '@santiment-network/ui'
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../../queries/InsightsGQL'
import InsightCard from '../../Insight/InsightCardWithMarketcap'
import News from '../../../components/News/News'
import styles from './TrendsExploreAdditionalInfo.module.scss'
import {
  getInsightTrendTagByDate,
  oneDayTimestamp
} from '../../Insight/InsightsTrends'

const NEWS_INDEX = 'News'
const INSIGHTS_INDEX = 'Insights'

const TrendsExploreAdditionalInfo = ({
  news,
  isLoadingNews,
  isErrorNews,
  allInsightsByTag: insights,
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

const mapStateToProps = ({ news: { data = [], isLoading, isError } }) => ({
  news: data,
  isLoadingNews: isLoading,
  isErrorNews: isError
})

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
        ownProps: { allInsightsByTag: ownInsights = [], loading }
      }) => ({
        allInsightsByTag: allInsightsByTag.concat(
          filteredInsightsByWord(ownInsights, filterInsightsByWord)
        ),
        isLoading: loading
      })
    })
  )
}

const enhance = compose(
  connect(mapStateToProps),
  ...getPast3DaysInsightsByTrendTag()
)

export default enhance(TrendsExploreAdditionalInfo)
