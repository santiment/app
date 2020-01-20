import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { parse } from 'query-string'
import { graphql, Query } from 'react-apollo'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import { Metrics } from '../../ducks/SANCharts/data'
import GA from './../../utils/tracking'
import InsightsWrap from '../../components/Insight/InsightsWrap'
import AnonBannerCardB from '../../components/Banner/AnonBanner/AnonBannerCardB'
import { ALL_INSIGHTS_BY_PAGE_QUERY } from '../../queries/InsightsGQL'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import { creationDateSort } from '../Insights/utils'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import StoriesList from '../../components/Stories/StoriesList'
import paywallBoundaries from './paywallBoundaries'
import styles from './index.module.scss'

function onGetStartedClick () {
  GA.event({
    category: 'User',
    action: '"Get started" click'
  })
}

const mapStateToProps = state => {
  return {
    isWideChart: state.rootUi.isWideChartEnabled
  }
}

export default compose(
  connect(mapStateToProps),
  graphql(ALL_INSIGHTS_BY_PAGE_QUERY, {
    fetchPolicy: 'cache-and-network',
    options: () => ({
      variables: { page: 1 }
    })
  })
)(({ isLoggedIn, location, history, isWideChart, data: { insights = [] } }) => {
  const sortedInsights = insights.sort(creationDateSort).slice(0, 6)
  const {
    slug = 'bitcoin',
    ticker = 'BTC',
    title = 'Bitcoin (BTC)',
    projectId = 1505
  } = parse(location.search)
  const onChangeSlug = ({ slug: newSlug } = {}) => {
    slug && slug !== newSlug && history.replace(`/projects/${newSlug}`)
  }

  return (
    <>
      <div className={styles.wrapper}>
        {!isWideChart && <StoriesList classes={styles} />}
        <div className={cx('elem-container', isWideChart && styles.wideChart)}>
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
                    slug={slug}
                    title={title}
                    projectId={projectId}
                    isWideChart={isWideChart}
                    metrics={[
                      Metrics.historyPrice,
                      Metrics.socialVolume,
                      Metrics.age_destroyed
                    ]}
                    classes={styles}
                    isLoggedIn={isLoggedIn}
                    onSlugSelect={onChangeSlug}
                    isControlled
                    isPRO={userPlan === 'PRO'}
                    project={{
                      ticker,
                      slug,
                      projectId
                    }}
                    {...boundaries}
                  />
                </>
              )
            }}
          </Query>
        </div>
      </div>
      <div className='page'>
        {isLoggedIn || (
          <AnonBannerCardB
            onClick={onGetStartedClick}
            className={styles.banner}
            title='Why Santiment?'
            description='Track selected assets in one place and check its status'
            button='Sign up for free'
          />
        )}
        <h2 className={styles.title}>Latest Insights</h2>
        <InsightsWrap insights={sortedInsights} />
      </div>
    </>
  )
})
