import React, { useMemo, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import Tabs from '@santiment-network/ui/Tabs'
import { useFeaturedScreeners } from '../../../../ducks/Watchlists/gql/lists/hooks'
import { SCREENERS_ANCHOR } from '../../Navigation/anchors'
import { getScreenerLink } from '../../../../ducks/Watchlists/url'
import { metrics } from '../../../../ducks/Watchlists/Widgets/Filter/dataHub/metrics'
import { buildColumns } from '../../../../ducks/Watchlists/Widgets/Table/Columns/builder'
import { DYNAMIC_COLUMNS } from './utils'
import { Section, Container } from '../index'
import Table from './Table'
import styles from './index.module.scss'

const FEATURED_SCREENERS_QUERY = gql`
  query featuredScreeners {
    watchlists: featuredScreeners {
      id
      name
      function
      tableConfiguration {
        id
      }
    }
  }
`

const FeaturedScreeners = () => {
  const [tab, setTab] = useState(null)
  const [activeScreener, setActiveScreener] = useState(null)
  const [featuredScreeners] = useFeaturedScreeners(FEATURED_SCREENERS_QUERY)

  buildColumns(metrics, DYNAMIC_COLUMNS)

  const tabs = useMemo(
    () => featuredScreeners.map(({ name }) => name).slice(0, 4),
    [featuredScreeners]
  )

  useEffect(() => {
    if (featuredScreeners.length !== 0) {
      setTab(featuredScreeners[0].name)
    }
  }, [featuredScreeners])

  useEffect(() => {
    if (tab) {
      const item = featuredScreeners.find(screener => screener.name === tab)
      setActiveScreener(item)
    }
  }, [tab])

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
        {activeScreener && <Table screener={activeScreener} />}
      </Container>
    </Section>
  )
}

export default FeaturedScreeners
