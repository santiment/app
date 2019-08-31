import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import { TRIGGERS_QUERY } from './queries'

const GetSignals = ({ render, ...props }) => render({ ...props })

GetSignals.defaultProps = {
  signals: []
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export const signalsGqlMapper = {
  name: 'Signals',
  skip: ({ isLoggedIn, always = false }) => !always && !isLoggedIn,
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: ({ Signals }) => {
    const { currentUser, featuredUserTriggers, loading, error } = Signals
    const signals = (currentUser || {}).triggers || featuredUserTriggers || []

    if (error) {
      throw new Error(
        "Can't load signals. Apollo error: " + JSON.stringify(error)
      )
    }

    return {
      signals,
      isLoading: loading,
      isError: !!error
    }
  }
}

export default compose(
  connect(mapStateToProps),
  graphql(TRIGGERS_QUERY, signalsGqlMapper)
)(GetSignals)
