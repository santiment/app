import React from 'react'
import GA from 'react-ga'
import { graphql } from 'react-apollo'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import InsightsWrap from '../../components/Insight/InsightsWrap'
import AnonBannerCardB from '../../components/Banner/AnonBanner/AnonBannerCardB'
import { ALL_INSIGHTS_BY_PAGE_QUERY } from '../../queries/InsightsGQL'
import { creationDateSort } from '../Insights/utils'
import styles from './index.module.scss'

function onGetStartedClick () {
  GA.event({
    category: 'User',
    action: '"Get started" click'
  })
}

export default graphql(ALL_INSIGHTS_BY_PAGE_QUERY, {
  fetchPolicy: 'cache-and-network',
  options: () => ({
    variables: { page: 1 }
  })
})(({ isLoggedIn, data: { insights = [] } }) => {
  const sortedInsights = insights.sort(creationDateSort).slice(0, 6)
  return (
    <div className={styles.wrapper + ' page'}>
      <ChartWidget
        slug='bitcoin'
        title='Bitcoin (BTC)'
        projectId='1505'
        metrics={['historyPrice', 'mvrvRatio', 'socialVolume']}
        classes={styles}
      />
      {isLoggedIn || (
        <AnonBannerCardB
          onClick={onGetStartedClick}
          className={styles.banner}
        />
      )}
      <h2 className={styles.title}>Latest Insights</h2>
      <InsightsWrap insights={sortedInsights} />
    </div>
  )
})
