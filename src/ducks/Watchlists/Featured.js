import React from 'react'
import Cards from './Cardss'
import { useFeaturedWatchlists } from './gql/queries'

const FeaturedWatchlists = ({ className }) => {
  const [watchlists] = useFeaturedWatchlists()

  return (
    <Cards
      className={className}
      watchlists={watchlists}
      path='/watchlist/projects/'
      isWithNewCheck={false}
      isWithVisibility={false}
    />
  )
}

export default FeaturedWatchlists
