import React from 'react'
import Section from './Section'
import Recents from './Recents'
import Categories from '../../../ducks/SANCharts/Categories'
import styles from './index.module.scss'

const sortWatchlists = ({ name: a }, { name: b }) => a.length - b.length
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
