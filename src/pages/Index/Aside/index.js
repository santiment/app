import React from 'react'
import Section from './Section'
import Recents from './Recents'
import Categories from '../../../ducks/SANCharts/Categories'
import styles from './index.module.scss'

const Aside = ({ className }) => (
  <aside className={className}>
    <Recents />
    <Section title='Indices'>
      <Categories classes={styles} />
    </Section>
  </aside>
)

export default Aside
