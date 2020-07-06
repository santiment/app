import React from 'react'
import { useFeaturedWatchlists } from '../Watchlists/gql/hooks'
import WatchlistCard from '../../components/Watchlists/WatchlistCard'

const Categories = ({ onClick, classes = {} }) => {
  const [watchlists = []] = useFeaturedWatchlists()

  return watchlists.map(watchlist => {
    const { name, listItems } = watchlist || {}
    if (!watchlist || listItems.length === 0) return null
    return (
      <WatchlistCard
        key={name}
        watchlist={watchlist}
        name={name}
        onClick={onClick}
        className={classes.watchlist}
        {...watchlist}
      />
    )
  })
}

export default Categories
