import React from 'react'
import { WatchlistCards } from './Card'
import { useFeaturedWatchlists } from '../gql/queries'

const FeaturedWatchlists = ({ className }) => {
  const [watchlists] = useFeaturedWatchlists()

  return (
    <WatchlistCards
      className={className}
      watchlists={watchlists}
      path='/watchlist/projects/'
      isWithVisibility={false}
    />
  )
}

export default FeaturedWatchlists
