import React from 'react'
import Section from './Section'
import Page from '../../ducks/Page'
import { useUser } from '../../stores/user'
import { DesktopOnly, MobileOnly } from '../../components/Responsive'
import StoriesList from '../../components/Stories/StoriesList'
import RecentlyWatched from '../../components/RecentlyWatched/RecentlyWatched'
import { WatchlistCards } from '../../ducks/Watchlists/Cards/Card'
import FeaturedWatchlistCards from '../../ducks/Watchlists/Cards/Featured'
import { WatchlistEmptySection } from '../../ducks/Watchlists/Cards/MyWatchlist'
import {
  useUserWatchlists,
  useUserScreeners
} from '../../ducks/Watchlists/gql/queries'
import NewWatchlistCard from '../../ducks/Watchlists/Cards/NewCard'
import MobileAnonBanner from '../../ducks/Watchlists/Templates/Anon/WatchlistsAnon'
import InlineBanner from '../../components/banners/feature/InlineBanner'
import styles from './index.module.scss'

const LoginBanner = ({ isDesktop }) =>
  isDesktop ? (
    <InlineBanner
      title='Get ability to create your own watchlist when you login'
      description="Track selected assets in one place and check it's status"
    />
  ) : (
    <MobileAnonBanner isFullScreen wrapperClassName={styles.login} />
  )

const Cards = ({ type, path, watchlists }) => (
  <>
    <WatchlistCards
      className={styles.card}
      watchlists={watchlists}
      path={path}
    />

    <DesktopOnly>
      <NewWatchlistCard type={type} />
    </DesktopOnly>
  </>
)

const MyWatchlists = ({ data }) => {
  const [watchlists, isLoading] = data
  if (isLoading) return null

  if (watchlists.length === 0) {
    return (
      <WatchlistEmptySection
        wrapperClassName={styles.empty}
        className={styles.empty__img}
      />
    )
  }

  return <Cards watchlists={watchlists} path='/watchlist/projects/' />
}

const MyScreeners = () => {
  const [watchlists, isLoading] = useUserScreeners()
  if (isLoading) return null

  return <Cards watchlists={watchlists} path='/screener/' type='screener' />
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
        <RecentlyWatched type='watchlists' />
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
          <MyWatchlists data={userWatchlistsData} />
        ) : (
          loading || <LoginBanner isDesktop={isDesktop} />
        )}
      </Section>

      <Section isGrid={isDesktop} title='My screeners'>
        <MyScreeners />
      </Section>
    </Page>
  )
}

export default Watchlists
