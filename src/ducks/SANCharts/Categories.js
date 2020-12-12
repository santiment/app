import React from 'react'
import { useFeaturedWatchlists } from '../Watchlists/gql/hooks'
import WatchlistCard from '../Watchlists/Cards/WatchlistCard'

const Categories = ({ onClick, classes = {} }) => {
  const [watchlists = []] = useFeaturedWatchlists()

  return watchlists.map(watchlist => {
    const { id, name, listItems } = watchlist || {}
    if (!watchlist || listItems.length === 0) return null

    return (
      <WatchlistCard
        key={name}
        watchlist={watchlist}
        name={name}
        onClick={onClick}
        className={classes.watchlist}
        to={onClick ? undefined : `/assets/list?name=${name}@${id}`}
        {...watchlist}
      />
    )
  })
}

export default Categories
