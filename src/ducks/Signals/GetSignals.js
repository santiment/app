import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from './../../pages/UserSelectors'
import { TRIGGERS_QUERY } from './common/queries'

const POLLING_INTERVAL = 25000

const GetSignals = ({ render, ...props }) => render({ ...props })

GetSignals.defaultProps = {
  signals: []
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export default compose(
  connect(mapStateToProps),
  graphql(TRIGGERS_QUERY, {
    name: 'Signals',
    skip: ({ isLoggedIn }) => !isLoggedIn,
    options: () => ({
      pollInterval: POLLING_INTERVAL,
      context: { isRetriable: true }
    }),
    props: ({ Signals }) => {
      const { currentUser, loading, error } = Signals
      const signals = (currentUser || {}).triggers || []
      return {
        signals,
        isLoading: loading,
        isError: !!error
      }
    }
  })
)(GetSignals)
