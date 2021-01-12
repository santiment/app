import React from 'react'
import cx from 'classnames'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import WatchlistCard from './Card'
import Page from '../../ducks/Page'
import styles from './New.module.scss'

export const WATCHLIST_GENERAL_FRAGMENT = gql`
  fragment generalListData on UserList {
    id
    name
    insertedAt
    isPublic
  }
`

export const FEATURED_WATCHLISTS_QUERY = gql`
  query featuredWatchlists {
    featuredWatchlists {
      ...generalListData
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
`

export const USER_WATCHLISTS_QUERY = gql`
  query fetchWatchlists {
    fetchWatchlists {
      ...generalListData
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
`

const ARRAY = []
export function useFeaturedWatchlists () {
  const { data } = useQuery(FEATURED_WATCHLISTS_QUERY)
  return data ? data.featuredWatchlists : ARRAY
}

const Section = ({ children, title, isGrid }) => {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={cx(styles.section, isGrid && styles.grid)}>
        {children}
      </div>
    </>
  )
}

const Watchlists = ({ isDesktop }) => {
  const featureWatchlists = useFeaturedWatchlists()
  console.log(featureWatchlists)
  return (
    <Page
      title={isDesktop ? null : 'Watchlists'}
      isContained
      isWithPadding={false}
    >
      <Section isGrid title='Explore watchlists'>
        {featureWatchlists.map(watchlist => (
          <WatchlistCard key={watchlist.id} watchlist={watchlist} />
        ))}
      </Section>
      <Section title='My watchlists'>123</Section>
      <Section title='My screeners'>123</Section>
    </Page>
  )
}

export default Watchlists
