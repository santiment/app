import React, { useMemo } from 'react'
import cx from 'classnames'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import WatchlistCard from './Card'
import Page from '../../ducks/Page'
import { useUser } from '../../stores/user'
import { isStage } from '../../utils/utils'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import InlineBanner from '../../components/banners/feature/InlineBanner'
import { WatchlistEmptySection } from '../../ducks/Watchlists/Cards/MyWatchlist'
import NewWatchlistCard from '../../ducks/Watchlists/Cards/NewCard'
import StoriesList from '../../components/Stories/StoriesList'
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
      id
      name
    }
  }
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
const DEFAULT_SCREENERS = [
  {
    name: 'My screener',
    href: '/screener/',
    id:
      process.env.REACT_APP_BACKEND_URL.indexOf('stage') > -1 || isStage
        ? 1183
        : 5496
  }
]
const noop = _ => _
function newWatchlistHook (query) {
  const { data, loading } = useQuery(query)
  return [data ? data.watchlists : ARRAY, loading]
}
function newUserWatchlistsHook (filter, reduce = noop) {
  const data = newWatchlistHook(USER_WATCHLISTS_QUERY)
  return useMemo(
    () => {
      data[0] = reduce(data[0].filter(filter))
      return data
    },
    [data[0]]
  )
}

const checkIsScreener = ({ function: fn }) => fn.name !== 'empty'
const checkIsNotScreener = ({ function: fn }) => fn.name === 'empty'

const useFeaturedWatchlists = () => newWatchlistHook(FEATURED_WATCHLISTS_QUERY)
export const useUserWatchlists = () => newUserWatchlistsHook(checkIsNotScreener)
export const useUserScreeners = () =>
  newUserWatchlistsHook(checkIsScreener, watchlists =>
    watchlists.length > 0 ? watchlists : DEFAULT_SCREENERS
  )

export const Section = ({ children, title, isGrid }) => (
  <>
    <h2 className={styles.title}>{title}</h2>
    <div className={cx(styles.section, isGrid && styles.grid)}>{children}</div>
  </>
)

const Cards = ({ watchlists, ...props }) =>
  watchlists.map(watchlist => (
    <WatchlistCard {...props} key={watchlist.id} watchlist={watchlist} />
  ))

export const FeaturedWatchlistCards = ({ className }) => {
  const [watchlists] = useFeaturedWatchlists()

  return (
    <Cards
      className={className}
      watchlists={watchlists}
      path='/watchlist/projects/'
      isWithNewCheck={false}
      isWithVisibility={false}
    />
  )
}

const UserWatchlistCards = ({ data }) => {
  const [watchlists, isLoading] = data || useUserWatchlists() // NOTE: When component mounted, always should be one or another [@vanguard | Jan 12, 2021]

  if (isLoading) return null

  if (watchlists.length === 0) {
    return (
      <WatchlistEmptySection
        wrapperClassName={styles.empty}
        className={styles.empty__img}
      />
    )
  }

  return (
    <>
      <Cards watchlists={watchlists} path='/watchlist/projects/' />

      <DesktopOnly>
        <NewWatchlistCard />
      </DesktopOnly>
    </>
  )
}

const UserScreenerCards = () => {
  const [watchlists, isLoading] = useUserScreeners()

  if (isLoading) return null

  return (
    <>
      <Cards watchlists={watchlists} path='/screener/' />

      <DesktopOnly>
        <NewWatchlistCard type='screener' />
      </DesktopOnly>
    </>
  )
}

const Watchlists = ({ isDesktop }) => {
  const { isLoggedIn, loading } = useUser()
  const userWatchlistsData = useUserWatchlists()

  return (
    <Page
      title={isDesktop ? null : 'Watchlists'}
      isContained
      isWithPadding={!isDesktop}
      className={styles.wrapper}
    >
      <MobileOnly>
        <StoriesList classes={styles} />
      </MobileOnly>

      <DesktopOnly>
        <Section isGrid title='Explore watchlists'>
          <FeaturedWatchlistCards />
        </Section>
      </DesktopOnly>

      <Section
        isGrid={isDesktop && isLoggedIn && userWatchlistsData[0].length > 0}
        title='My watchlists'
      >
        {isLoggedIn ? (
          <UserWatchlistCards data={userWatchlistsData} />
        ) : (
          loading || (
            <InlineBanner
              title='Get ability to create your own watchlist when you login'
              description="Track selected assets in one place and check it's status"
            />
          )
        )}
      </Section>

      <Section isGrid={isDesktop} title='My screeners'>
        <UserScreenerCards />
      </Section>
    </Page>
  )
}

export default Watchlists
