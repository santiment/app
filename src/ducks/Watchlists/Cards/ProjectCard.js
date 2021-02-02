import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Card from './Card'
import emptyChartSvg from './emptyChart.svg'
import { calcPercentageChange } from '../../../utils/utils'
import { millify } from '../../../utils/formatting'
import MiniChart from '../../../components/MiniChart'
import PercentChanges from '../../../components/PercentChanges'

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
const useMarketcap = (variables, skip, onLoad) => {
  const { data } = useQuery(WATCHLIST_MARKETCAP_HISTORY_QUERY, {
    variables,
    skip
  })

  return useMemo(
    () => {
      if (!data) return LOADING
      if (onLoad) onLoad()

      const { historicalStats } = data.watchlist
      const { length } = historicalStats

      if (length === 0) return DEFAULT

      const lastMarketcap = historicalStats[length - 1].marketcap
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

const ProjectCard = ({ skipMarketcap, onMarketcapLoad, ...props }) => {
  const { data, marketcap, change } = useMarketcap(
    props.watchlist,
    skipMarketcap,
    onMarketcapLoad
  )
  const noMarketcap = marketcap === NULL_MARKETCAP

  return (
    <Card
      path='/watchlist/projects/'
      {...props}
      simplifiedChildren={<PercentChanges changes={change} />}
      middleChildren={
        <>
          {marketcap}
          {noMarketcap ? (
            <img src={emptyChartSvg} alt='empty chart' />
          ) : (
            <MiniChart
              valueKey='marketcap'
              data={data}
              change={change}
              width={90}
            />
          )}
        </>
      }
      bottomChildren={
        noMarketcap ? (
          'No assets'
        ) : (
          <>
            <PercentChanges changes={change} />
            &nbsp;&nbsp; total cap, 7d
          </>
        )
      }
    />
  )
}

export default ProjectCard
