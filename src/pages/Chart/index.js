import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { parse } from 'query-string'
import { Query } from 'react-apollo'
import ChartWidget from '../../ducks/SANCharts/ChartPage'
import { Metrics } from '../../ducks/SANCharts/data'
import GA from './../../utils/tracking'
import AnonBannerCardB from '../../components/Banner/AnonBanner/AnonBannerCardB'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
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

export default connect(mapStateToProps)(
  ({ isLoggedIn, location, history, isWideChart }) => {
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
          <div
            className={cx('elem-container', isWideChart && styles.wideChart)}
          >
            <Query query={USER_SUBSCRIPTIONS_QUERY}>
              {({ data: { currentUser } = {} }) => {
                const subscription = getCurrentSanbaseSubscription(currentUser)
                const userPlan = subscription ? subscription.plan.name : 'FREE'
                const boundaries =
                  paywallBoundaries[isLoggedIn ? userPlan : 'ANON']

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
        </div>
      </>
    )
  }
)
