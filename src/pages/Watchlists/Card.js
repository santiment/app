import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { getSEOLinkFromIdAndTitle } from '../../utils/url'
import { calcPercentageChange } from '../../utils/utils'
import { millify } from '../../utils/formatting'
import MiniChart from '../../components/MiniChart'
import PercentChanges from '../../components/PercentChanges'
import NewLabel from '../../components/NewLabel/NewLabel'
import { VisibilityIndicator } from '../../components/VisibilityIndicator'
import emptyChartSvg from '../../ducks/Watchlists/Cards/emptyChart.svg'
import styles from './Card.module.scss'

export const WATCHLIST_MARKETCAP_HISTORY_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      id
      historicalStats(from: "utc_now-7d", to: "utc_now", interval: "6h") {
        datetime
        marketcap
      }
    }
  }
`

const NULL_MARKETCAP = '$ 0'
const LOADING = {
  isLoading: true
}
const DEFAULT = {
  marketcap: NULL_MARKETCAP
}
const useMarketcap = id => {
  const { data } = useQuery(WATCHLIST_MARKETCAP_HISTORY_QUERY, {
    variables: { id }
  })

  return useMemo(
    () => {
      if (!data) return LOADING

      const { historicalStats } = data.watchlist

      if (historicalStats.length === 0) return DEFAULT

      const lastMarketcap =
        historicalStats[historicalStats.length - 1].marketcap
      const firstMarketcap = historicalStats[0].marketcap

      return {
        data: historicalStats,
        marketcap: `$ ${millify(lastMarketcap)}`,
        change: calcPercentageChange(firstMarketcap, lastMarketcap)
      }
    },
    [data]
  )
}

const WatchlistCard = ({
  watchlist,
  path,
  isWithNewCheck,
  isWithVisibility
}) => {
  const { id, name, insertedAt, isPublic } = watchlist
  const { data, marketcap, change } = useMarketcap(watchlist.id)
  const noMarketcap = marketcap === NULL_MARKETCAP

  return (
    <a
      href={path + getSEOLinkFromIdAndTitle(id, name)}
      className={styles.wrapper}
    >
      <div className={styles.header}>
        {isWithNewCheck && (
          <NewLabel date={insertedAt} className={styles.new} />
        )}
        {name}
        {isWithVisibility && (
          <VisibilityIndicator
            isPublic={isPublic}
            className={styles.visibility}
          />
        )}
      </div>
      <div className={styles.marketcap}>
        {marketcap}
        {noMarketcap ? (
          <img src={emptyChartSvg} alt='empty chart' />
        ) : (
          <MiniChart name='marketcap' data={data} change={change} width={90} />
        )}
      </div>
      <div className={styles.change}>
        {noMarketcap ? (
          'No assets'
        ) : (
          <>
            <PercentChanges changes={change} />
            &nbsp;&nbsp; total cap, 7d
          </>
        )}
      </div>
    </a>
  )
}

WatchlistCard.defaultProps = {
  isWithNewCheck: true,
  isWithVisibility: true
}

export default WatchlistCard
