import React from 'react'
import {
  useUserScreeners,
  useCreateScreener
} from '../../ducks/Watchlists/gql/hooks'
import {
  isDefaultScreenerPath,
  getWatchlistLink
} from '../../ducks/Watchlists/utils'

function redirectToUserWatchlist ({
  createScreener,
  isLoadingNewScreener,
  history,
  screeners
}) {
  const isDefaultFirstScreener = isDefaultScreenerPath(screeners[0].to)

  if (isDefaultFirstScreener) {
    if (!isLoadingNewScreener) {
      createScreener({ name: 'My Screener', isPublic: false }).then(
        screener => {
          history.push(getWatchlistLink(screener))
        }
      )
    }
  }

  if (!isDefaultFirstScreener) {
    history.push(getWatchlistLink(screeners[0]))
  }
}

const NewScreener = ({ history }) => {
  const [screeners = [], isLoadingScreenersList] = useUserScreeners()
  const [
    createScreener,
    { loading: isLoadingNewScreener }
  ] = useCreateScreener()

  if (!isLoadingScreenersList) {
    redirectToUserWatchlist({
      createScreener,
      isLoadingNewScreener,
      history,
      screeners
    })
  }

  return null
}

export default NewScreener
