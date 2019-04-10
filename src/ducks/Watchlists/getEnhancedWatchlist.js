import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import moment from 'moment'
import { checkIsLoggedIn } from './../../pages/UserSelectors'

const GetWatchlists = ({ render, ...props }) => render({ ...props })

GetWatchlists.defaultProps = {
  watchlists: [],
  isWatchlistsLoading: false
}

const sortWatchlists = (list, list2) =>
  moment.utc(list.insertedAt).diff(moment.utc(list2.insertedAt))

const mapStateToProps = state => ({
  isLoggedIn: checkIsLoggedIn(state)
})

const getEnhancedWatchlist = ({ query, name, requiresAuth = false }) =>
  compose(
    connect(mapStateToProps),
    graphql(query, {
      skip: ({ isLoggedIn }) => requiresAuth && !isLoggedIn,
      options: () => ({
        context: { isRetriable: true }
      }),
      props: ({ data }) => {
        const watchlists = data[name] || []
        return {
          watchlists: [...watchlists].sort(sortWatchlists),
          isWatchlistsLoading: data.loading
        }
      }
    })
  )(GetWatchlists)

export default getEnhancedWatchlist
