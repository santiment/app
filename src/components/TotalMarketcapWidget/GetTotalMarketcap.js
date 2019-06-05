import React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import {
  totalMarketcapGQL,
  projectsListHistoryStatsGQL
} from './TotalMarketcapGQL'
import TotalMarketcapWidget from './TotalMarketcapWidget'
import { getTimeIntervalFromToday, MONTH } from '../../utils/dates'
import { normalizeStats } from '../Watchlists/WatchlistCard'

const getMarketcapQuery = (type, projects) => {
  const { from, to } = getTimeIntervalFromToday(-3, MONTH)

  const slugsQueryTotal = graphql(totalMarketcapGQL, {
    props: ({ data: { historyPrice = [] } }) => ({
      historyPrices: {
        TOTAL_MARKET: normalizeStats(historyPrice)
      }
    }),
    options: () => ({
      variables: {
        from: from.toISOString(),
        to: to.toISOString(),
        slug: 'TOTAL_MARKET'
      }
    })
  })

  if (type === 'all') {
    return slugsQueryTotal
  }

  const slugsQueryERC20 = graphql(totalMarketcapGQL, {
    props: ({ data: { historyPrice = [] }, ownProps: { historyPrices } }) => ({
      historyPrices: {
        ...historyPrices,
        TOTAL_LIST_MARKET: normalizeStats(historyPrice)
      }
    }),
    options: () => ({
      variables: {
        from: from.toISOString(),
        to: to.toISOString(),
        slug: 'TOTAL_ERC20'
      }
    })
  })

  if (type === 'erc20') {
    return compose(
      slugsQueryTotal,
      slugsQueryERC20
    )
  }

  const sortedProjects = projects
    .slice()
    .sort(
      ({ marketcapUsd: a_marketcapUsd }, { marketcapUsd: b_marketcapUsd }) =>
        a_marketcapUsd < b_marketcapUsd ? 1 : -1
    )

  const slugs = sortedProjects.map(({ slug }) => slug)

  const slugsQuery = graphql(projectsListHistoryStatsGQL, {
    props: ({
      data: { projectsListHistoryStats = [] },
      ownProps: { historyPrices }
    }) => ({
      historyPrices: {
        ...historyPrices,
        TOTAL_LIST_MARKET: normalizeStats(projectsListHistoryStats)
      }
    }),
    options: () => ({
      variables: {
        from: from.toISOString(),
        to: to.toISOString(),
        slugs
      }
    })
  })

  return compose(
    slugsQueryTotal,
    slugsQuery
  )
}

const GetTotalMarketcap = ({ type, from, projects, ...rest }) => {
  const resultQuery = getMarketcapQuery(type, projects)
  const HistoryQuery = resultQuery(TotalMarketcapWidget)
  return <HistoryQuery {...rest} />
}

const mapStateToProps = state => ({
  projects: state.projects.items
})

export default connect(mapStateToProps)(GetTotalMarketcap)
