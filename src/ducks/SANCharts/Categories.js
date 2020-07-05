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
        slugs={listItems.map(({ project }) => project.slug)}
        onClick={onClick}
        className={classes.watchlist}
      />
    )
  })
}

export default Categories
