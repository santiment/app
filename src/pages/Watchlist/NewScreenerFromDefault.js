import React from 'react'
import PageLoader from '../../components/Loader/PageLoader'
import { getScreenerLink } from '../../ducks/Watchlists/url'
import { checkIsDefaultScreener } from '../../ducks/Screener/utils'
import { useUserScreeners } from '../../ducks/Watchlists/gql/lists/hooks'
import { useCreateScreener } from '../../ducks/Watchlists/gql/list/mutations'

const NewScreener = ({ history }) => {
  const [screeners, isScreenersLoading] = useUserScreeners()
  const [createScreener, { loading }] = useCreateScreener()

  if (!isScreenersLoading && checkIsDefaultScreener(screeners[0].href)) {
    if (!loading) {
      createScreener({ name: 'My Screener', isPublic: false }).then(screener =>
        history.push(getScreenerLink(screener))
      )
    }
  } else {
    history.push(getScreenerLink(screeners[0]))
  }

  return <PageLoader />
}

export default NewScreener
