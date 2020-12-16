import React from 'react'
import Section from './Section'
import Recents from './Recents'
import Categories from '../../../ducks/SANCharts/Categories'
import styles from './index.module.scss'

const WatchlistIdOrder = {}
const WATCHLIST_IDS_ORDER = [5496, 5497, 2046, 86, 749, 127, 272]
WATCHLIST_IDS_ORDER.forEach((id, i) => {
  WatchlistIdOrder[id] = i
})

const sortWatchlists = ({ id: a }, { id: b }) =>
  WatchlistIdOrder[a] - WatchlistIdOrder[b]
const sorter = watchlists => watchlists.slice().sort(sortWatchlists)

const Aside = ({ className }) => (
  <aside className={className}>
    <Recents />
    <Section title='Indices'>
      <Categories sorter={sorter} classes={styles} />
    </Section>
  </aside>
)

export default Aside
