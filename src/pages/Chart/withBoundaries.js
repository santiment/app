import { graphql } from 'react-apollo'
import { getCurrentSanbaseSubscription } from '../../utils/plans'
import { USER_SUBSCRIPTIONS_QUERY } from '../../queries/plans'
import paywallBoundaries from './paywallBoundaries'

export default graphql(USER_SUBSCRIPTIONS_QUERY, {
  skip: ({ metrics, from, to }) => false,
  props: ({ data: { currentUser = [] }, ownProps: { isLoggedIn } }) => {
    const subscription = getCurrentSanbaseSubscription(currentUser)
    const userPlan = subscription ? subscription.plan.name : 'FREE'
    const boundaries = paywallBoundaries[isLoggedIn ? userPlan : 'ANON']

    return {
      boundaries
    }
  }
})
