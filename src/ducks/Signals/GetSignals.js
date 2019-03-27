import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from './../../pages/UserSelectors'

const POLLING_INTERVAL = 5000

const TRIGGERS_QUERY = gql`
  query {
    currentUser {
      id
      triggers {
        id
        isPublic
        cooldown
        settings
        title
        isActive
        isRepeating
        description
        tags {
          name
        }
      }
    }
  }
`

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
      console.log(signals)
      return {
        signals,
        isLoading: loading,
        isError: !!error
      }
    }
  })
)(GetSignals)
