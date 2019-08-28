import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import { FEATURED_USER_TRIGGERS_QUERY } from './queries'
import { signalsGqlMapper } from './getSignals'

const GetFeaturedUserTriggers = ({ render, ...props }) => render({ ...props })

GetFeaturedUserTriggers.defaultProps = {
  signals: []
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export default compose(
  connect(mapStateToProps),
  graphql(FEATURED_USER_TRIGGERS_QUERY, signalsGqlMapper)
)(GetFeaturedUserTriggers)
