import React from 'react'
import GA from 'react-ga'
import { parse } from 'query-string'
import { graphql, Query } from 'react-apollo'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import InsightsWrap from '../../components/Insight/InsightsWrap'
import AnonBannerCardB from '../../components/Banner/AnonBanner/AnonBannerCardB'
import { ALL_INSIGHTS_BY_PAGE_QUERY } from '../../queries/InsightsGQL'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import { creationDateSort } from '../Insights/utils'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import TutorialList from '../../components/Tutorials/TutorialList'
import paywallBoundaries from './paywallBoundaries'
import styles from './index.module.scss'

function onGetStartedClick () {
  GA.event({
    category: 'User',
    action: '"Get started" click'
  })
}

const AfterHeader = <TutorialList classes={styles} />

export default graphql(ALL_INSIGHTS_BY_PAGE_QUERY, {
  fetchPolicy: 'cache-and-network',
  options: () => ({
    variables: { page: 1 }
  })
})(({ isLoggedIn, location, history, data: { insights = [] } }) => {
  const sortedInsights = insights.sort(creationDateSort).slice(0, 6)
  const { slug = 'bitcoin' } = parse(location.search)
  const onChangeSlug = ({ slug: newSlug } = {}) => {
    slug && slug !== newSlug && history.replace(`/projects/${newSlug}`)
  }
  return (
    <div className={styles.wrapper + ' page'}>
      <h2 className={styles.week}>
        <span role='img' aria-label='cup'>
          🏆
        </span>
        Chart of the week
      </h2>
      <Query query={USER_SUBSCRIPTIONS_QUERY}>
        {({ data: { currentUser } = {} }) => {
          const subscription = getCurrentSanbaseSubscription(currentUser)
          const userPlan = subscription ? subscription.plan.name : 'FREE'
          const boundaries = paywallBoundaries[userPlan]

          return (
            <>
              <ChartWidget
                enabledViewOnlySharing={false}
                history={history}
                location={location}
                adjustNightMode={false}
                showToggleAnomalies={true}
                slug='bitcoin'
                title='Bitcoin (BTC)'
                projectId='1505'
                metrics={['historyPrice', 'socialVolume', 'tokenAgeConsumed']}
                classes={styles}
                isLoggedIn={isLoggedIn}
                onSlugSelect={onChangeSlug}
                AfterHeader={AfterHeader}
                isControlled
                {...boundaries}
              />
            </>
          )
        }}
      </Query>
      {isLoggedIn || (
        <AnonBannerCardB
          onClick={onGetStartedClick}
          className={styles.banner}
          title='Why Santiment?'
          description='Track selected assets in one place and check it’s status'
          button='Sign up for free'
        />
      )}
      <h2 className={styles.title}>Latest Insights</h2>
      <InsightsWrap insights={sortedInsights} />
    </div>
  )
})
