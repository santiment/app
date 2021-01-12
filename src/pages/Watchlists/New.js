import React, { useMemo } from 'react'
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
    function
    insertedAt
    isPublic
  }
`

export const FEATURED_WATCHLISTS_QUERY = gql`
  query featuredWatchlists {
    watchlists: featuredWatchlists {
      ...generalListData
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
`

export const USER_WATCHLISTS_QUERY = gql`
  query fetchWatchlists {
    watchlists: fetchWatchlists {
      ...generalListData
    }
  }
  ${WATCHLIST_GENERAL_FRAGMENT}
`

const ARRAY = []
function newWatchlistHook (query) {
  const { data } = useQuery(query)
  return data ? data.watchlists : ARRAY
}
function newUserWatchlistsHook (filter) {
  const watchlists = newWatchlistHook(USER_WATCHLISTS_QUERY)
  return useMemo(() => watchlists.filter(filter), [watchlists])
}

const checkIsScreener = ({ function: fn }) => fn.name !== 'empty'
const checkIsNotScreener = ({ function: fn }) => fn.name === 'empty'

const useFeaturedWatchlists = () => newWatchlistHook(FEATURED_WATCHLISTS_QUERY)
const useUserWatchlists = () => newUserWatchlistsHook(checkIsNotScreener)
const useUserScreeners = () => newUserWatchlistsHook(checkIsScreener)

const Section = ({ children, title, isGrid }) => (
  <>
    <h2 className={styles.title}>{title}</h2>
    <div className={cx(styles.section, isGrid && styles.grid)}>{children}</div>
  </>
)

const FeaturedWatchlistCards = () => {
  const watchlists = useFeaturedWatchlists()

  return watchlists.map(watchlist => (
    <WatchlistCard
      key={watchlist.id}
      path='/watchlist/projects/'
      watchlist={watchlist}
      isWithNewCheck={false}
      isWithVisibility={false}
    />
  ))
}

const UserWatchlistCards = () => {
  const watchlists = useUserWatchlists()

  return watchlists.map(watchlist => (
    <WatchlistCard
      key={watchlist.id}
      path='/watchlist/projects/'
      watchlist={watchlist}
    />
  ))
}

const UserScreenerCards = () => {
  const watchlists = useUserScreeners()

  return watchlists.map(watchlist => (
    <WatchlistCard key={watchlist.id} path='/screener/' watchlist={watchlist} />
  ))
}

const Watchlists = ({ isDesktop }) => {
  return (
    <Page
      title={isDesktop ? null : 'Watchlists'}
      isContained
      isWithPadding={false}
    >
      <Section isGrid title='Explore watchlists'>
        <FeaturedWatchlistCards />
      </Section>
      <Section isGrid title='My watchlists'>
        <UserWatchlistCards />
      </Section>
      <Section isGrid title='My screeners'>
        <UserScreenerCards />
      </Section>
    </Page>
  )
}

export default Watchlists
