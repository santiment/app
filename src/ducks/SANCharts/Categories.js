import React from 'react'
import WatchlistCard from '../Watchlists/Cards/ProjectCard'
import { getProjectsWatchlistLink } from '../Watchlists/url'
import { useFeaturedWatchlists } from '../Watchlists/gql/lists/hooks'

const Categories = ({ onClick, classes = {} }) => {
  const [watchlists] = useFeaturedWatchlists()

  return watchlists.map((watchlist, idx) => (
    <WatchlistCard
      key={idx}
      watchlist={watchlist}
      onClick={onClick}
      className={classes.watchlist}
      to={onClick ? undefined : getProjectsWatchlistLink(watchlist)}
      isWithNewCheck={false}
    />
  ))
}

export default Categories
