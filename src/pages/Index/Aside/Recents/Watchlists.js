import React from 'react'
import gql from 'graphql-tag'
import Recent, { getItemBuilder, Column } from './Recent'
import { VisibilityIndicator } from '../../../../components/VisibilityIndicator'
import { getWatchlistLink } from '../../../../ducks/Watchlists/utils'
import { millify } from '../../../../utils/formatting'
import PercentChanges from '../../../../components/PercentChanges'
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
  const firstData = historicalStats[0]
  const marketcapLast = lastData ? lastData.marketcap : 0
  const marketcapFirst = firstData ? firstData.marketcap : 0

  const change = (marketcapLast - marketcapFirst) / marketcapFirst

  return (
    <>
      <Column>
        <VisibilityIndicator isPublic={isPublic} className={styles.icon} />
        {name}
      </Column>
      <div className={styles.marketcap}>
        ${millify(marketcapLast)}
        <PercentChanges className={styles.change} changes={change} />
      </div>
    </>
  )
}

const Watchlists = ({ title, ids }) => (
  <Recent
    rightHeader='Market Cap, 24h change'
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
