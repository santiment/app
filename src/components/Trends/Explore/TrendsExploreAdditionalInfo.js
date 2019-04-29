import React from 'react'
import { connect } from 'react-redux'
import { Tabs } from '@santiment-network/ui'
import News from '../../../components/News/News'
import styles from './TrendsExploreAdditionalInfo.module.scss'

const newsTab = { content: 'News', index: 'News' }

class TrendsExploreAdditionalInfo extends React.PureComponent {
  state = {
    newsTab: newsTab,
    selectedTab: newsTab.index
  }

  static getDerivedStateFromProps (props, state) {
    const newsContent = `${newsTab.index} (${props.news.length})`
    if (newsContent !== state.newsTab.content) {
      const newsTab = { ...state.newsTab, content: newsContent }
      return { ...state, newsTab }
    }
    return null
  }

  render () {
    const { newsTab, selectedTab } = this.state
    const { news, isErrorNews, isLoadingNews } = this.props

    let isNotVisible = isErrorNews || isLoadingNews

    const tabs = []
    const tabsDisabled = []
    news.length > 0 ? tabs.push(newsTab) : tabsDisabled.push(newsTab)

    if (tabs.length === 0 || isNotVisible) return null
    return (
      <section className={styles.wrapper}>
        <Tabs
          options={tabs}
          defaultSelectedIndex={tabs[0].index}
          disabledIndexes={tabsDisabled}
          onSelect={this.handleSelectTab}
        />
        {news.length > 0 && selectedTab === newsTab.index && (
          <News data={news} />
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

export default connect(mapStateToProps)(TrendsExploreAdditionalInfo)
