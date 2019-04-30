import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { checkIsLoggedIn } from './../../pages/UserSelectors'

const GetWatchlists = ({ render, ...props }) => render({ ...props })

GetWatchlists.defaultProps = {
  watchlists: [],
  isWatchlistsLoading: false
}

const sortWatchlists = (list, list2) =>
  new Date(list.insertedAt) > new Date(list2.insertedAt) ? 1 : -1

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
