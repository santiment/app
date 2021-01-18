import React from 'react'
import { WatchlistCards } from './Card'
import { useFeaturedWatchlists } from '../gql/queries'

const FeaturedWatchlists = ({ className, ...props }) => {
  const [watchlists] = useFeaturedWatchlists()

  return (
    <WatchlistCards
      {...props}
      className={className}
      watchlists={watchlists}
      path='/watchlist/projects/'
      isWithVisibility={false}
    />
  )
}

export default FeaturedWatchlists
