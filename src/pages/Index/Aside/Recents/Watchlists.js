import React from 'react'
import gql from 'graphql-tag'
import Recent, { getItemBuilder, Column } from './Recent'
import { VisibilityIndicator } from '../../../../components/VisibilityIndicator'
import { millify } from '../../../../utils/formatting'
import PercentChanges from '../../../../components/PercentChanges'
import { getWatchlistLink } from '../../../../ducks/Watchlists/url'
import styles from '../index.module.scss'

const getItem = getItemBuilder(gql`
  query watchlist($id: ID!) {
    item: watchlist(id: $id) {
      id
      name
      type
      slug
      function
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

  const change = marketcapFirst !== 0 ? (marketcapLast - marketcapFirst) / marketcapFirst : 0

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

const Watchlists = ({ ids, setHeight }) => (
  <Recent
    rightHeader='Market Cap, 24h change'
    ids={ids}
    getItem={getItem}
    getLink={getWatchlistLink}
    Item={Watchlist}
    setHeight={setHeight}
  />
)

Watchlists.defaultProps = {
  title: 'Watchlists',
}

export default Watchlists
