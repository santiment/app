import React from 'react'
import Card from './WatchlistCard'
import { useFeaturedWatchlists } from '../gql/hooks'
import { getWatchlistLink } from '../utils'
import { sorter } from '../../../pages/Index/Aside'

const Featured = () => {
  const [watchlists = [], loading] = useFeaturedWatchlists()
  return !loading
    ? sorter(watchlists).map(watchlist => {
      return (
        <Card
          key={watchlist.id}
          name={watchlist.name}
          skipIndicator
          watchlist={watchlist}
          to={getWatchlistLink(watchlist)}
          {...watchlist}
          isWithNewCheck={false}
        />
      )
    })
    : null
}

export default Featured
