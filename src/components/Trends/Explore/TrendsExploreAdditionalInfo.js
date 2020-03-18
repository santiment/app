import React, { useState } from 'react'
import { compose } from 'recompose'
import { Tabs } from '@santiment-network/ui'
import { getPast3DaysInsightsByTrendTag } from '../../Insight/InsightsTrends'
import News from '../../News/News'
import InsightsWrap from '../../Insight/InsightsWrap'
import styles from './TrendsExploreAdditionalInfo.module.scss'

const NEWS_INDEX = 'News'
const INSIGHTS_INDEX = 'Insights'

const TrendsExploreAdditionalInfo = ({
  news: newsRaw = [],
  allInsightsByTag,
  word,
  isLoadingInsights,
  isLoadingNews,
  isNewsEnabled
}) => {
  if (isLoadingInsights || isLoadingNews) return null
  const modifiedWord = word.toUpperCase()
  const insights = allInsightsByTag.filter(({ tags }) =>
    tags.some(({ name }) => name === modifiedWord)
  )

  const news = isNewsEnabled ? newsRaw : []

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

const enhance = compose(...getPast3DaysInsightsByTrendTag())

export default enhance(TrendsExploreAdditionalInfo)
