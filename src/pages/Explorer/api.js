import { query } from 'webkit/api'
import { EntityType, EntityQuery } from './const'

export const queryExplorerItems = ({
  types = [],
  range,
  voted = false,
  currentUserDataOnly = false,
  page = 1,
  pageSize = 20,
} = {}) => {
  const accessor = ({ getExplorerItems: { stats, data } }) => ({
    pages: stats.totalPagesCount,
    items: data,
  })

  const QUERYKEY = `getMost${voted ? 'Voted' : 'Recent'}`
  const CURSOR = range ? `cursor: { type: AFTER, datetime: "utc_now-${range}" }` : ''

  const projectWatchlist = types.includes(EntityType.WATCHLIST.key)
    ? EntityQuery.projectWatchlist
    : ''
  const screener = types.includes(EntityType.SCREENER.key) ? EntityQuery.screener : ''
  const chartConfiguration = types.includes(EntityType.CHART.key)
    ? EntityQuery.chartConfiguration
    : ''
  const insight = types.includes('INSIGHT') ? EntityQuery.insight : ''
  const addressWatchlist = types.includes(EntityType.ADDRESS.key)
    ? EntityQuery.addressWatchlist
    : ''
  const userTrigger = types.includes(EntityType.ALERT.key) ? EntityQuery.userTrigger : ''

  const QUERY = `
      {
        getExplorerItems: ${QUERYKEY} (
          types: [${types.join(', ')}]
          page: ${page}
          pageSize: ${pageSize}
          ${CURSOR}
          currentUserDataOnly: ${currentUserDataOnly}
        ){
          stats {
            totalPagesCount
          }
          data {
            ${projectWatchlist}
            ${screener}
            ${chartConfiguration}
            ${insight}
            ${addressWatchlist}
            ${userTrigger}
          }
        }
      }
    `
  return query(QUERY).then(accessor)
}
