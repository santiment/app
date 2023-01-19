import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { WatchlistCards } from './Card'
import ProjectCard, { useMarketcap } from './ProjectCard'
import { useFeaturedScreeners, useFeaturedWatchlists } from '../gql/lists/hooks'
import { SCREENER } from '../detector'

const FEATURED_MARKETCAP_HISTORY_QUERY = (query) => gql`
  query {
    featuredWatchlists:${query} {
      id
      historicalStats(from: "utc_now-7d", to: "utc_now", interval: "6h") {
        marketcap
      }
    }
  }
`
const FEATURED_WATCHLISTS_MARKETCAP_HISTORY_QUERY =
  FEATURED_MARKETCAP_HISTORY_QUERY('featuredWatchlists')

const FEATURED_SCREENERS_MARKETCAP_HISTORY_QUERY =
  FEATURED_MARKETCAP_HISTORY_QUERY('featuredScreeners')

const marketcapAccessor = ({ featuredWatchlists }, { id }) =>
  featuredWatchlists.find((watchlist) => watchlist.id === id)

function useWatchlistMarketcap(
  watchlist,
  skip,
  onLoad,
  query = FEATURED_WATCHLISTS_MARKETCAP_HISTORY_QUERY,
) {
  const { data } = useQuery(query, {
    skip,
  })

  return useMarketcap(data, watchlist, onLoad, marketcapAccessor)
}

const FeaturedWatchlists = ({ className, ...props }) => {
  const [watchlists] = useFeaturedWatchlists()
  const [screeners] = useFeaturedScreeners()

  return (
    <>
      <WatchlistCards
        Card={ProjectCard}
        {...props}
        className={className}
        watchlists={watchlists}
        path='/watchlist/projects/'
        useWatchlistMarketcap={useWatchlistMarketcap}
        isWithVisibility={false}
      />

      {screeners.length ? (
        <WatchlistCards
          Card={ProjectCard}
          {...props}
          className={className}
          watchlists={screeners}
          path='/screener/'
          useWatchlistMarketcap={(...args) =>
            useWatchlistMarketcap(...args, FEATURED_SCREENERS_MARKETCAP_HISTORY_QUERY)
          }
          isWithVisibility={false}
          type={SCREENER}
        />
      ) : null}
    </>
  )
}

export default FeaturedWatchlists
