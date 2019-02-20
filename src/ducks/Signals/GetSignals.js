import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from './../../pages/UserSelectors'

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
