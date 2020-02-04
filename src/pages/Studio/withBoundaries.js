import { compose } from 'redux'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import { checkHasPremium, checkIsLoggedIn } from '../UserSelectors'
import paywallBoundaries from './paywallBoundaries'

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state),
  hasPremium: checkHasPremium(state)
})

export default compose(
  connect(mapStateToProps),
  graphql(USER_SUBSCRIPTIONS_QUERY, {
    props: ({
      data: { currentUser },
      ownProps: { isLoggedIn, hasPremium }
    }) => {
      if (hasPremium) {
        return {
          boundaries: paywallBoundaries.ENTERPRISE
        }
      }

      const subscription = getCurrentSanbaseSubscription(currentUser)
      const userPlan = subscription ? subscription.plan.name : 'FREE'
      const boundaries = paywallBoundaries[isLoggedIn ? userPlan : 'ANON']

      return {
        boundaries
      }
    }
  })
)
