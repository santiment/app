import React from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import {
  WATCHLISTS_BY_SLUG,
  PUBLIC_WATCHLISTS
} from '../../pages/assets/assets-overview-constants'
import {
  WATCHLIST_QUERY,
  WATCHLIST_BY_SLUG_SHORT_QUERY
} from '../../queries/WatchlistGQL'
import WatchlistCard from '../../components/Watchlists/WatchlistCard'

const Categories = ({ slugs, onClick, watchlists }) => {
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
      />
    )
  })
}

const getPublicWatchlists = () =>
  PUBLIC_WATCHLISTS.map(({ id }) =>
    graphql(WATCHLIST_QUERY, {
      options: () => ({ variables: { id: +id } }),
      props: ({ data: { watchlist }, ownProps: { watchlists = [] } }) => ({
        watchlists: [...watchlists, watchlist]
      })
    })
  )

const getPublicWatchlistsBySlug = () =>
  WATCHLISTS_BY_SLUG.map(({ bySlug }) =>
    graphql(WATCHLIST_BY_SLUG_SHORT_QUERY, {
      options: () => ({ variables: { slug: bySlug } }),
      props: ({
        data: { watchlistBySlug },
        ownProps: { watchlists = [] }
      }) => ({
        watchlists: [...watchlists, watchlistBySlug]
      })
    })
  )

const enhance = compose(
  ...getPublicWatchlists(),
  ...getPublicWatchlistsBySlug()
)

export default enhance(Categories)
