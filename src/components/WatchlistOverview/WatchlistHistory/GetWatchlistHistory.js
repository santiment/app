import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import {
  CATEGORY_HISTORY_QUERY,
  PROJECTS_HISTORY_QUERY
} from './WatchlistHistoryGQL'
import { BASIC_CATEGORIES } from '../../../ducks/Watchlists/utils'
import WatchlistHistoryWidget from './WatchlistHistoryWidget'

const getHistoryQuery = ({ projects, interval, method, slug }) => {
  const { from, to } = method

  const slugsQueryTotal = graphql(CATEGORY_HISTORY_QUERY, {
    options: () => ({
      variables: {
        from: from.toISOString(),
        to: to.toISOString(),
        interval,
        slug
      }
    }),
    props: ({ data: { historyPrice = [], loading: isLoading } }) => ({
      historyPrice,
      isLoading
    })
  })

  if (slug) return slugsQueryTotal

  return graphql(PROJECTS_HISTORY_QUERY, {
    options: () => ({
      variables: {
        from: from.toISOString(),
        to: to.toISOString(),
        slugs: projects.map(({ slug }) => slug),
        interval
      }
    }),
    props: ({
      data: { projectsListHistoryStats = [], loading: isLoading }
    }) => ({
      historyPrice: projectsListHistoryStats,
      isLoading
    })
  })
}

const GetWatchlistHistory = ({ type, from, projects, range, ...rest }) => {
  if (range) {
    const category = BASIC_CATEGORIES.find(
      ({ assetType }) => assetType === type
    )
    const slug = category && category.slug
    const { interval, value, method } = range
    const resultQuery = getHistoryQuery({ projects, slug, interval, method })
    const HistoryQuery = resultQuery(WatchlistHistoryWidget)
    return (
      <HistoryQuery
        {...rest}
        type={slug ? 'Total' : 'Watchlist'}
        period={value}
        combinedInterval={interval}
      />
    )
  }
}

const mapStateToProps = ({ projects: { items } }) => ({ projects: items })

export default connect(mapStateToProps)(GetWatchlistHistory)
