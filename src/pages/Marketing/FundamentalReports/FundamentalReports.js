import React from 'react'
import { Query } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import withSizes from 'react-sizes'
import cx from 'classnames'
import Loader from '@santiment-network/ui/Loader/Loader'
import { mapSizesToProps } from '../../../utils/withSizes'
import { INSIGHT_BY_ID_QUERY } from '../../../queries/InsightsGQL'
import InsightCard from '../../../components/Insight/InsightCard'
import { getCurrentSanbaseSubscription } from '../../../utils/plans'
import { PRO } from '../../../components/Navbar/NavbarProfileDropdown'
import NonProBanner from './NonProBanner'
import styles from './FundamentalReports.module.scss'

const FundamentalReports = ({ isDesktop, isProSanbase }) => {
  const insights = [5632, 3229, 2959]

  return (
    <div className={styles.container}>
      <div className={cx(styles.insights, !isProSanbase && styles.blur)}>
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
      {!isProSanbase && <NonProBanner />}
    </div>
  )
}

const mapStateToProps = ({ user: { data } }) => {
  const sanbaseSubscription = getCurrentSanbaseSubscription(data)

  const isProSanbase =
    sanbaseSubscription && sanbaseSubscription.plan
      ? sanbaseSubscription.plan.name === PRO
      : false

  return {
    isProSanbase
  }
}

export default compose(
  connect(mapStateToProps),
  withSizes(mapSizesToProps)
)(FundamentalReports)
