import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from '../../../pages/UserSelectors'
import { TRIGGERS_QUERY } from './queries'

const GetSignals = ({ render, filters, signals, ...props }) => {
  if (filters && filters.channel) {
    signals = filterByChannels(signals, filters.channel)
  }

  return render({ signals, filters, ...props })
}

GetSignals.defaultProps = {
  signals: [],
  filters: {}
}

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export const filterByChannels = (signals, type) =>
  signals.filter(({ settings: { channel } }) =>
    Array.isArray(channel) ? channel.indexOf(type) !== -1 : channel === type
  )

export const signalsGqlMapper = {
  name: 'Signals',
  skip: ({ isLoggedIn }) => !isLoggedIn,
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: ({ Signals }) => {
    const { currentUser, featuredUserTriggers, loading, error } = Signals
    let signals = (currentUser || {}).triggers || featuredUserTriggers || []

    if (error) {
      throw new Error(
        "Can't load alerts. Apollo error: " + JSON.stringify(error)
      )
    }

    return {
      data: {
        userId: currentUser ? currentUser.id : undefined,
        signals
      },
      isLoading: loading,
      isError: !!error
    }
  }
}
export const featuredSignalsGqlMapper = {
  ...signalsGqlMapper,
  skip: () => true
}

export default compose(
  connect(mapStateToProps),
  graphql(TRIGGERS_QUERY, signalsGqlMapper)
)(GetSignals)
