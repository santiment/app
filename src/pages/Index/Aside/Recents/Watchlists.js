import React from 'react'
import gql from 'graphql-tag'
import Recent, { getItemBuilder } from './Recent'
import { usdFormatter } from '../../../../ducks/dataHub/metrics/formatters'
import styles from '../index.module.scss'

const getLink = ({ id, name }) => `/assets/list?name=${name}@${id}`
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
      <div className={styles.group}>{name}</div>
      {usdFormatter(marketcap)}
    </>
  )
}

const Watchlists = ({ ids }) => (
  <Recent
    title='Watchlists'
    rightHeader='Market Cap'
    ids={ids}
    getItem={getItem}
    getLink={getLink}
    Item={Watchlist}
  />
)

export default Watchlists
