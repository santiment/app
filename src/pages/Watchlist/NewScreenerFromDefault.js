import React from 'react'
import PageLoader from '../../components/Loader/PageLoader'
import { getScreenerLink } from '../../ducks/Watchlists/url'
import { useCreateScreener } from '../../ducks/Watchlists/gql/hooks'
import { useUserScreeners } from '../../ducks/Watchlists/gql/queries'
import { checkIsDefaultScreener } from '../../ducks/Screener/utils'

function redirectToUserWatchlist ({
  createScreener,
  isLoadingNewScreener,
  history,
  screeners
}) {
  const isDefaultFirstScreener = checkIsDefaultScreener(screeners[0].href)

  if (isDefaultFirstScreener) {
    if (!isLoadingNewScreener) {
      createScreener({ name: 'My Screener', isPublic: false }).then(screener =>
        history.push(getScreenerLink(screener))
      )
    }
  } else {
    history.push(getScreenerLink(screeners[0]))
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

  return <PageLoader />
}

export default NewScreener
