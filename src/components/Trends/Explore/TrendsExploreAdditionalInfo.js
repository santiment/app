import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { Tabs } from '@santiment-network/ui'
import { ALL_INSIGHTS_BY_TAG_QUERY } from '../../../queries/InsightsGQL'
import InsightCard from '../../Insight/InsightCardWithMarketcap'
import News from '../../../components/News/News'
import styles from './TrendsExploreAdditionalInfo.module.scss'

const newsTabDefault = { content: 'News', index: 'News' }
const insightsTabDefault = { content: 'Insights', index: 'Insights' }

class TrendsExploreAdditionalInfo extends React.PureComponent {
  state = {
    newsTab: newsTabDefault,
    insightsTab: insightsTabDefault,
    selectedTab: newsTabDefault.index
  }

  static getDerivedStateFromProps (props, state) {
    const newsLength = props.news.length
    const insightsLength = props.insights.length

    const newsContent = `${newsTabDefault.index} (${newsLength})`
    const insightsContent = `${insightsTabDefault.index} (${insightsLength})`

    if (
      newsContent !== state.newsTab.content ||
      insightsContent !== state.insightsTab.content
    ) {
      const newsTab = { ...state.newsTab, content: newsContent }
      const insightsTab = { ...state.insightsTab, content: insightsContent }

      let selectedTab
      if (state.selectedTab === insightsTabDefault.index) {
        selectedTab =
          insightsLength > 0 ? insightsTabDefault.index : newsTabDefault.index
      } else {
        selectedTab =
          newsLength > 0 ? newsTabDefault.index : insightsTabDefault.index
      }

      return { ...state, newsTab, insightsTab, selectedTab }
    }

    return null
  }

  render () {
    const { newsTab, insightsTab, selectedTab } = this.state
    const {
      news,
      isErrorNews,
      isLoadingNews,
      insights,
      isLoadingInsights
    } = this.props

    let isNotVisible = isErrorNews || isLoadingNews || isLoadingInsights

    const tabs = []
    const tabsDisabled = []
    insights.length > 0
      ? tabs.push(insightsTab)
      : tabsDisabled.push(insightsTab)
    news.length > 0 ? tabs.push(newsTab) : tabsDisabled.push(newsTab)

    console.log(
      'isNotVisible: ',
      isNotVisible,
      'tabs: ',
      tabs,
      'insights: ',
      insights,
      'news: ',
      news
    )

    if (tabs.length === 0 || isNotVisible) return null
    return (
      <section className={styles.wrapper}>
        <Tabs
          options={tabs}
          defaultSelectedIndex={selectedTab}
          disabledIndexes={tabsDisabled}
          onSelect={this.handleSelectTab}
        />
        {news.length > 0 && selectedTab === newsTab.index && (
          <News data={news} />
        )}
        {insights.length > 0 && selectedTab === insightsTab.index && (
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
      </section>
    )
  }

  handleSelectTab = tab => {
    if (tab !== this.state.selectedTab) {
      this.setState({ selectedTab: tab })
    }
  }
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
      insights: allInsightsByTag,
      isLoadingInsights: loading
    })
  })
)

export default enhance(TrendsExploreAdditionalInfo)
