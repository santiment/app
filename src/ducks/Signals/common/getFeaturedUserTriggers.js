import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { FEATURED_USER_TRIGGERS_QUERY } from './queries'
import { signalsGqlMapper } from './getSignals'

const GetFeaturedUserTriggers = ({ render, ...props }) => render({ ...props })

GetFeaturedUserTriggers.defaultProps = {
  signals: []
}

export default compose(graphql(FEATURED_USER_TRIGGERS_QUERY, signalsGqlMapper))(
  GetFeaturedUserTriggers
)
