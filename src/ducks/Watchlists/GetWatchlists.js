import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import moment from 'moment'
import { WatchlistGQL } from './../../components/WatchlistPopup/WatchlistGQL'
import { checkIsLoggedIn } from './../../pages/UserSelectors'

const POLLING_INTERVAL = 15000

const GetWatchlists = ({ render, ...props }) => render({ ...props })

GetWatchlists.defaultProps = {
  watchlists: [],
  isWatchlistsLoading: false
}

const sortWatchlists = (list, list2) =>
  moment.utc(list.insertedAt).diff(moment.utc(list2.insertedAt))

const mapStateToProps = state => {
  return {
    isLoggedIn: checkIsLoggedIn(state)
  }
}

export default compose(
  connect(mapStateToProps),
  graphql(WatchlistGQL, {
    name: 'Watchlists',
    skip: ({ isLoggedIn }) => !isLoggedIn,
    options: () => ({
      pollInterval: POLLING_INTERVAL,
      context: { isRetriable: true }
    }),
    props: ({ Watchlists }) => {
      const { fetchUserLists = [], loading = true } = Watchlists
      return {
        watchlists: [...fetchUserLists].sort(sortWatchlists),
        isWatchlistsLoading: loading
      }
    }
  })
)(GetWatchlists)
