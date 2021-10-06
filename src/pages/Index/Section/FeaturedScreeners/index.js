import React, { useMemo, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import Tabs from '@santiment-network/ui/Tabs'
import { useFeaturedScreeners } from '../../../../ducks/Watchlists/gql/lists/hooks'
import { SCREENERS_ANCHOR } from '../../Navigation/anchors'
import { getScreenerLink } from '../../../../ducks/Watchlists/url'
import { Section, Container } from '../index'
import styles from './index.module.scss'

const FEATURED_SCREENERS_QUERY = gql`
  query featuredScreeners {
    watchlists: featuredScreeners {
      id
      name
      function
    }
  }
`

const FeaturedScreeners = () => {
  const [tab, setTab] = useState(null)
  const [activeScreener, setActiveScreener] = useState(null)
  const [featuredScreeners] = useFeaturedScreeners(FEATURED_SCREENERS_QUERY)

  const tabs = useMemo(
    () => featuredScreeners.map(({ name }) => name).slice(0, 4),
    [featuredScreeners]
  )

  useEffect(
    () => {
      if (featuredScreeners.length !== 0) {
        setTab(featuredScreeners[0].name)
      }
    },
    [featuredScreeners]
  )

  useEffect(
    () => {
      if (tab) {
        const item = featuredScreeners.find(screener => screener.name === tab)
        setActiveScreener(item)
      }
    },
    [tab]
  )

  const link = activeScreener && getScreenerLink(activeScreener)

  return (
    <Section
      title='Explore screeners'
      id={SCREENERS_ANCHOR}
      className={styles.section}
    >
      {tab && (
        <Tabs
          className={styles.tabs}
          options={tabs}
          defaultSelectedIndex={tab}
          onSelect={tab => setTab(tab)}
          classes={styles}
        />
      )}
      {link && (
        <Link to={link} className={styles.link}>
          Start researching {tab}
        </Link>
      )}
      <Container>
        {activeScreener && JSON.stringify(activeScreener.function)}
      </Container>
    </Section>
  )
}

export default FeaturedScreeners
