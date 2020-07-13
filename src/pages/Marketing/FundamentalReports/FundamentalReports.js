import React from 'react'
import { Query } from 'react-apollo'
import { compose } from 'recompose'
import withSizes from 'react-sizes'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import { mapSizesToProps } from '../../../utils/withSizes'
import { INSIGHT_BY_ID_QUERY } from '../../../queries/InsightsGQL'
import InsightCard from '../../../components/Insight/InsightCard'
import NonProBanner from './NonProBanner'
import { useUserSubscriptionStatus } from '../../../stores/user/subscriptions'
import styles from './FundamentalReports.module.scss'

const FundamentalReports = ({ isDesktop }) => {
  const insights = [5632, 3229, 2959]
  const { isPro } = useUserSubscriptionStatus()

  return (
    <div className={styles.container}>
      <div className={cx(styles.insights, !isPro && styles.blur)}>
        {insights.map(id => {
          return (
            <Query query={INSIGHT_BY_ID_QUERY} variables={{ id }} key={id}>
              {({ data: { insight } = {}, loading }) => {
                if (loading) {
                  return <Loader className={styles.loader} />
                }

                if (!insight) {
                  return null
                }

                return (
                  <InsightCard
                    isDesktop={isDesktop}
                    disabled
                    withAuthorPic
                    {...insight}
                    key={insight.id}
                    showDate={true}
                    className={styles.insight}
                  />
                )
              }}
            </Query>
          )
        })}
      </div>
      {!isPro && <NonProBanner />}
    </div>
  )
}

export default withSizes(mapSizesToProps)(FundamentalReports)
