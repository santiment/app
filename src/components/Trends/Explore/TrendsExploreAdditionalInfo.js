import React, { useState } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Tabs } from '@santiment-network/ui'
import { DAY, getTimeIntervalFromToday } from '../../../utils/dates'
import { NEWS_QUERY } from '../../News/NewsGQL'
import { getPast3DaysInsightsByTrendTag } from '../../Insight/InsightsTrends'
import News from '../../News/News'
import InsightsWrap from '../../Insight/InsightsWrap'
import styles from './TrendsExploreAdditionalInfo.module.scss'

const NEWS_INDEX = 'News'
const INSIGHTS_INDEX = 'Insights'

const TrendsExploreAdditionalInfo = ({
  news: newsRaw,
  allInsightsByTag,
  word,
  isLoadingInsights,
  isLoadingNews,
  isBetaModeEnabled
}) => {
  if (isLoadingInsights || isLoadingNews) return null
  const modifiedWord = word.toUpperCase()
  const insights = allInsightsByTag.filter(({ tags }) =>
    tags.some(({ name }) => name === modifiedWord)
  )

  const news = isBetaModeEnabled ? newsRaw : []

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

  if (tabs.length === 0) return null
  const defaultSelectedTab = tabs[0].index

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
          <InsightsWrap insights={insights} />
        )}
      </div>
    </section>
  )
}

const mapStateToProps = ({ rootUi: { isBetaModeEnabled } }) => ({
  isBetaModeEnabled
})

const enhance = compose(
  connect(mapStateToProps),
  ...getPast3DaysInsightsByTrendTag(),
  graphql(NEWS_QUERY, {
    options: ({ word: tag }) => {
      const { from, to } = getTimeIntervalFromToday(-3, DAY)
      return {
        variables: { from, to, tag, size: 6 }
      }
    },
    props: ({ data: { news = [], loading } }) => ({
      news: news.reverse(),
      isLoadingNews: loading
    })
  })
)

export default enhance(TrendsExploreAdditionalInfo)
