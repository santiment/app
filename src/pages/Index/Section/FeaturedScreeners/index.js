import React, { useMemo, useState, useEffect } from 'react'
import Tabs from '@santiment-network/ui/Tabs'
import { useFeaturedScreeners } from '../../../../ducks/Watchlists/gql/lists/hooks'
import { SCREENERS_ANCHOR } from '../../Navigation/anchors'
import { Section, Container } from '../index'
import styles from './index.module.scss'

const FeaturedScreeners = () => {
  const [tab, setTab] = useState(null)
  const [activeScreener, setActiveScreener] = useState(null)
  const [featuredScreeners] = useFeaturedScreeners()

  const tabs = useMemo(
    () => featuredScreeners.map(({ name }) => name).slice(0, 4),
    [featuredScreeners]
  )

  useEffect(
    () => {
      if (featuredScreeners.length !== 0) {
        setTab(featuredScreeners[0].name)
        setActiveScreener(featuredScreeners[0])
      }
    },
    [featuredScreeners]
  )

  return (
    <Section title='Explore screeners' id={SCREENERS_ANCHOR}>
      {tab && (
        <Tabs
          className={styles.tabs}
          options={tabs}
          defaultSelectedIndex={tab}
          onSelect={tab => setTab(tab)}
          classes={styles}
        />
      )}
    </Section>
  )
}

export default FeaturedScreeners
