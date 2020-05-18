import React from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { WATCHLISTS_BY_SLUG } from '../../pages/assets/assets-overview-constants'
import { WATCHLIST_BY_SLUG_SHORT_QUERY } from '../../queries/WatchlistGQL'
import WatchlistCard from '../../components/Watchlists/WatchlistCard'

const Categories = ({ onClick, watchlists, classes = {} }) => {
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

const enhance = compose(...getPublicWatchlistsBySlug())

export default enhance(Categories)
