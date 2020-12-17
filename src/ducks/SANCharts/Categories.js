import React, { useMemo } from 'react'
import { useFeaturedWatchlists } from '../Watchlists/gql/hooks'
import WatchlistCard from '../Watchlists/Cards/WatchlistCard'

const Categories = ({ sorter, onClick, classes = {} }) => {
  const [rawWatchlists = []] = useFeaturedWatchlists()
  const watchlists = useMemo(() => sorter(rawWatchlists), [rawWatchlists])

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
        isWithNewCheck={false}
      />
    )
  })
}

Categories.defaultProps = {
  sorter: _ => _
}

export default Categories
