import React from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import {
  WATCHLISTS_BY_FUNCTION,
  PUBLIC_WATCHLISTS
} from '../../pages/assets/assets-overview-constants'
import {
  WATCHLIST_QUERY,
  PROJECTS_BY_FUNCTION_BIG_QUERY
} from '../../queries/WatchlistGQL'
import WatchlistCard from '../../components/Watchlists/WatchlistCard'

const Categories = ({ slugs, onClick, watchlists }) => {
  return watchlists.map(watchlist => {
    if (!watchlist) return null
    const { name, listItems } = watchlist || {}
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

const getProjectsByFunction = () => {
  const { byFunction } = WATCHLISTS_BY_FUNCTION[0]

  return graphql(PROJECTS_BY_FUNCTION_BIG_QUERY, {
    options: () => ({ variables: { function: byFunction } }),
    props: ({
      data: { loading = true, allProjectsByFunction = [] },
      ownProps: { watchlists = [] }
    }) => ({
      watchlists: [
        ...watchlists,
        {
          name: 'Top 50 ERC20',
          listItems: allProjectsByFunction.map(project => ({ project }))
        }
      ]
    })
  })
}

const enhance = compose(
  ...getPublicWatchlists(),
  getProjectsByFunction()
)

export default enhance(Categories)
