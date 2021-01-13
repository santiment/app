import React from 'react'
import { useFeaturedWatchlists } from '../Watchlists/gql/queries'
import WatchlistCard from '../Watchlists/Cards/Card'

const Categories = ({ onClick, classes = {} }) => {
  const [watchlists = []] = useFeaturedWatchlists()

  return watchlists.map(watchlist => {
    const { id, name, listItems } = watchlist || {}
    if (!watchlist || listItems.length === 0) return null

    return (
      <WatchlistCard
        key={name}
        watchlist={watchlist}
        onClick={onClick}
        className={classes.watchlist}
        to={onClick ? undefined : `/assets/list?name=${name}@${id}`}
        isWithNewCheck={false}
      />
    )
  })
}

export default Categories
