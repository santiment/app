import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { DesktopOnly } from '../../../components/Responsive'
import MiniChart from '../../../components/MiniChart'
import PercentChanges from '../../../components/PercentChanges'
import Card from './Card'
import { calcPercentageChange } from '../../../utils/utils'
import { millify } from '../../../utils/formatting'
import emptyChartSvg from './emptyChart.svg'

export const WATCHLIST_MARKETCAP_HISTORY_QUERY = gql`
  query watchlist($id: ID!) {
    watchlist(id: $id) {
      id
      historicalStats(from: "utc_now-7d", to: "utc_now", interval: "6h") {
        marketcap
      }
    }
  }
`

const NULL_MARKETCAP = '$ 0'

const LOADING = {
  isLoading: true,
}

const DEFAULT = {
  marketcap: NULL_MARKETCAP,
}

export function useMarketcap(data, watchlist, onLoad, accessor) {
  return useMemo(() => {
    if (!data) return LOADING
    if (onLoad) onLoad()

    const source = accessor ? accessor(data, watchlist) : data.watchlist

    if (!source) {
      return LOADING
    }

    const { historicalStats } = source
    const { length } = historicalStats

    if (length === 0) return DEFAULT

    const lastMarketcap = historicalStats[length - 1].marketcap
    const firstMarketcap = historicalStats[0].marketcap

    return {
      data: historicalStats,
      marketcap: `$ ${millify(lastMarketcap)}`,
      change: calcPercentageChange(firstMarketcap, lastMarketcap),
    }
  }, [data])
}

function useWatchlistMarketcap(variables, skip, onLoad) {
  const { data } = useQuery(WATCHLIST_MARKETCAP_HISTORY_QUERY, {
    variables,
    skip,
  })

  return useMarketcap(data, variables, onLoad)
}

const ProjectCard = ({
  useWatchlistMarketcap,
  skipMarketcap,
  onMarketcapLoad,
  chartWidth,
  ...props
}) => {
  const { data, marketcap, change } = useWatchlistMarketcap(
    props.watchlist,
    skipMarketcap,
    onMarketcapLoad,
  )
  const noMarketcap = marketcap === NULL_MARKETCAP

  return (
    <Card
      {...props}
      simplifiedChildren={<PercentChanges changes={change} />}
      middleChildren={
        <>
          {marketcap}
          <DesktopOnly>
            {noMarketcap ? (
              <img src={emptyChartSvg} alt='empty chart' />
            ) : (
              <MiniChart
                valueKey='marketcap'
                data={data}
                change={change}
                width={chartWidth || 90}
              />
            )}
          </DesktopOnly>
        </>
      }
      bottomChildren={
        noMarketcap ? (
          'No assets'
        ) : (
          <>
            <PercentChanges changes={change} />
            <span className='body-2'>&nbsp;&nbsp; total cap, 7d</span>
          </>
        )
      }
      chart={
        noMarketcap ? (
          <img src={emptyChartSvg} alt='empty chart' width={104} height={64} />
        ) : (
          <MiniChart valueKey='marketcap' data={data} change={change} width={104} height={64} />
        )
      }
    />
  )
}

ProjectCard.defaultProps = {
  useWatchlistMarketcap,
  path: '/watchlist/projects/',
}

export default ProjectCard
