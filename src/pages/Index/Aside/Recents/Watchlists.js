import React from 'react'
import gql from 'graphql-tag'
import Recent, { getItemBuilder, Column } from './Recent'
import { VisibilityIndicator } from '../../../../components/VisibilityIndicator'
import { usdFormatter } from '../../../../ducks/dataHub/metrics/formatters'
import { getWatchlistLink } from '../../../../ducks/Watchlists/utils'
import styles from '../index.module.scss'

const getItem = getItemBuilder(gql`
  query watchlist($id: ID!) {
    item: watchlist(id: $id) {
      id
      name
      isPublic
      historicalStats(from: "utc_now-1d", to: "utc_now", interval: "1d") {
        marketcap
      }
    }
  }
`)

const Watchlist = ({ name, isPublic, historicalStats }) => {
  if (!name) return null

  const lastData = historicalStats[historicalStats.length - 1]
  const marketcap = lastData ? lastData.marketcap : null

  return (
    <>
      <Column>
        <VisibilityIndicator isPublic={isPublic} className={styles.icon} />
        {name}
      </Column>
      {usdFormatter(marketcap)}
    </>
  )
}

const Watchlists = ({ title, ids }) => (
  <Recent
    rightHeader='Market Cap'
    title={title}
    ids={ids}
    getItem={getItem}
    getLink={getWatchlistLink}
    Item={Watchlist}
  />
)

Watchlists.defaultProps = {
  title: 'Watchlists'
}

export default Watchlists
